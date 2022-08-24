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

        public RiskTreatmentAppService(IRiskTreatmentRepository _RiskTreatmentRepository) : base(_RiskTreatmentRepository)
        {
            RiskTreatmentRepository = _RiskTreatmentRepository;
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
                var ListRisks = RiskTreatmentRepository.Where(x => x.RiskOpportunityId == input.RiskOpportunityId)
                    .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping RiskTreatment to RiskTreatmentDto
                Risks = ObjectMapper.Map<List<RisksTreatment>, List<RiskTreatmentDto>>(ListRisks);
            }
            else
            {
                //get Risk By CategoryId and Filters and Pagination
                var ListDoc = RiskTreatmentRepository.Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping RiskTreatment to RiskTreatmentDto
                Risks = ObjectMapper.Map<List<RisksTreatment>, List<RiskTreatmentDto>>(ListDoc);
            }


            //Get the total count with Risk
            var totalCount = Risks.Count;
            // return RiskDtos and totalCount
            return new PagedResultDto<RiskTreatmentDto>(
                totalCount,
                Risks
            );
        }

        #endregion


    }
}
