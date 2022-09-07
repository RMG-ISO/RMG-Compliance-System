using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Attachments.Dtos;
using RMG.ComplianceSystem.RiskTreatments;
using RMG.ComplianceSystem.RiskTreatments.Dtos;
using RMG.ComplianceSystem.Permissions;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;
using RMG.ComplianceSystem.Attachments;
using RMG.ComplianceSystem.StaticData;

namespace RMG.ComplianceSystem.RiskTreatments
{
    // [Authorize(ComplianceSystemPermissions.RiskTreatment.Default)]
    public class RiskTreatmentAppService :
        CrudAppService<
            RisksTreatment, //The RiskTreatment entity
            RiskTreatmentDto, //Used to show RiskTreatments
            Guid, //Primary key of the RiskTreatment entity
            RiskTreatmentPagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdateRiskTreatmentDto>, //Used to create/update a RiskTreatment
        IRiskTreatmentAppService //implement the IRiskTreatmentAppService
    {
        //   Start Permissions
        #region Start Permissions
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Delete;
        #endregion
        // End Permissions
        //Start Properties and Constructor RiskTreatmentAppService
        #region Start Properties and Constructor RiskTreatmentAppService
        private readonly IRiskTreatmentRepository RiskTreatmentRepository;
        private readonly IdentityUserManager User;

        public RiskTreatmentAppService(IdentityUserManager _User, IRiskTreatmentRepository _RiskTreatmentRepository) : base(_RiskTreatmentRepository)
        {
            RiskTreatmentRepository = _RiskTreatmentRepository;
            User = _User;
        }
        #endregion
        //End Properties and Constructor RiskTreatmentAppService
        //Start Methods getbyId and GetListRiskTreatmentBy
        #region Start Methods getbyId and 
        public async Task<PagedResultDto<RiskTreatmentDto>> GetListRiskByFilterAsync(RiskTreatmentPagedAndSortedResultRequestDto input)
        {
            List<RiskTreatmentDto> Risks = new List<RiskTreatmentDto>();
            if (input.RiskOpportunityId != null)
            {
                //get Risk By CategoryId and Filters and Pagination
                var ListRisks = RiskTreatmentRepository.Where(x => x.IsDeleted == false && x.RiskOpportunityId == input.RiskOpportunityId)
                    .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping RiskTreatment to RiskTreatmentDto
                Risks = ObjectMapper.Map<List<RisksTreatment>, List<RiskTreatmentDto>>(ListRisks);
            }
            else
            {
                //get Risk By CategoryId and Filters and Pagination
                var ListDoc = RiskTreatmentRepository.Where(x => x.IsDeleted == false).Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping RiskTreatment to RiskTreatmentDto
                Risks = ObjectMapper.Map<List<RisksTreatment>, List<RiskTreatmentDto>>(ListDoc);
            }

            var RisksData = new List<RiskTreatmentDto>();
            foreach (var item in Risks)
            {
                var RiskTreatment = new RiskTreatmentDto();
                RiskTreatment = item;
                if (RiskTreatment.CreatorId != null)
                {
                    var getuser = User.GetByIdAsync((Guid)RiskTreatment.CreatorId).Result;
                    RiskTreatment.Creator = ObjectMapper.Map<IdentityUser, IdentityUserDto>(getuser);
                }
                if (RiskTreatment.Responsibility != null)
                {
                    var getuser = User.GetByIdAsync((Guid)item.Responsibility).Result;
                    RiskTreatment.ResponsibilityName = getuser.UserName;
                }
                if (RiskTreatment.Status != null)
                {
                    RiskTreatment.StatusNameEn = getStatusName(RiskTreatment.Status).Result.NameEn;
                    RiskTreatment.StatusNameAr = getStatusName(RiskTreatment.Status).Result.NameAr;
                }

                RisksData.Add(RiskTreatment);
            }
            //Get the total count with Risk
            var totalCount = RisksData.Count;
            // return RiskDtos and totalCount
            return new PagedResultDto<RiskTreatmentDto>(
                totalCount,
                RisksData
            );
        }
        public async Task<List<getEnumTypeStaticData>> getStatus()
        {
            var status = new List<getEnumTypeStaticData>();
            status.Add(new getEnumTypeStaticData { Id = 1, NameEn = "Waiting ", NameAr = "قيد الانتظار " });
            status.Add(new getEnumTypeStaticData { Id = 2, NameEn = "Started ", NameAr = "تم البدء" });
            status.Add(new getEnumTypeStaticData { Id = 3, NameEn = "In Progress", NameAr = "في تقدم" });
            status.Add(new getEnumTypeStaticData { Id = 4, NameEn = "Completed ", NameAr = "تمت" });
            status.Add(new getEnumTypeStaticData { Id = 5, NameEn = "Late", NameAr = "متاخر" });
            status.Add(new getEnumTypeStaticData { Id = 6, NameEn = "Canceled ", NameAr = "تم الالغاء" });
            return status;  
        }
        public async Task<getEnumTypeStaticData> getStatusName(int? statusId)
        {
            var status = new List<getEnumTypeStaticData>();

            status.Add(new getEnumTypeStaticData { Id = 1, NameEn = "Waiting ", NameAr = "قيد الانتظار " });
            status.Add(new getEnumTypeStaticData { Id = 2, NameEn = "Started ", NameAr = "تم البدء" });
            status.Add(new getEnumTypeStaticData { Id = 3, NameEn = "In Progress", NameAr = "في تقدم" });
            status.Add(new getEnumTypeStaticData { Id = 4, NameEn = "Completed ", NameAr = "تمت" });
            status.Add(new getEnumTypeStaticData { Id = 5, NameEn = "Late", NameAr = "متاخر" });
            status.Add(new getEnumTypeStaticData { Id = 6, NameEn = "Canceled ", NameAr = "تم الالغاء" });
            var statusName = status.FirstOrDefault(t=>t.Id==statusId);
            return statusName;
;
        }
        #endregion


    }
}
