using RMG.ComplianceSystem.InternalAuditPreparation.Dto;
using RMG.ComplianceSystem.InternalAuditPreparations;
using RMG.ComplianceSystem.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.InternalAuditApproves
{
    public class InternalAuditApproveAppService :
        CrudAppService<
            InternalAuditApprove, //The InternalAuditApprove entity
            InternalAuditApproveDto, //Used to show InternalAuditApproves
            Guid, //Primary key of the InternalAuditApprove entity
            InternalAuditApprovePagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdateInternalAuditApproveDto>, //Used to create/update a InternalAuditApprove
        IInternalAuditApproveAppService //implement the IInternalAuditApproveAppService
    {
        //   Start Permissions
        #region Start Permissions
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditApprove.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditApprove.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditApprove.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditApprove.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditApprove.Delete;
        #endregion
        // End Permissions

        //Start Properties and Constructor InternalAuditApproveAppService
        #region Start Properties and Constructor InternalAuditApproveAppService

        private readonly IInternalAuditApproveRepository InternalAuditApproveRepository;
        private readonly IdentityUserManager User;
        private readonly IInternalAuditPreparationRepository _internalAuditPreparationRepository;

        public InternalAuditApproveAppService(IdentityUserManager _User, IInternalAuditPreparationRepository InternalAuditPreparationRepository,IInternalAuditApproveRepository _InternalAuditApproveRepository) : base(_InternalAuditApproveRepository)
        {
            InternalAuditApproveRepository = _InternalAuditApproveRepository;
            User = _User;
            _internalAuditPreparationRepository=InternalAuditPreparationRepository; 
        }
        #endregion
        //End Properties and Constructor InternalAuditApproveAppService
        //Start Methods getbyId and GetListInternalAuditApproveBy
        #region Start Methods getbyId and 
        public async Task<PagedResultDto<InternalAuditApproveDto>> GetListAuditAppoveByFilterAsync(InternalAuditApprovePagedAndSortedResultRequestDto input)
        {
            int totalCount = 0;
            var ListAuditApproves = InternalAuditApproveRepository.WhereIf(input.IsApprove != null, e => e.IsApprove == input.IsApprove)
                .WhereIf(input.ApproveBy != null, e => e.ApproveBy == input.ApproveBy)
                .WhereIf(input.approveDate != null, e => e.approveDate == input.approveDate)
                    .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
            var AuditApproves = ObjectMapper.Map<List<InternalAuditApprove>, List<InternalAuditApproveDto>>(ListAuditApproves);
            var ListAuditApprove = InternalAuditApproveRepository.ToList();
            totalCount = ListAuditApprove.Count;
            foreach (var item in AuditApproves)
            {
                var InternalAudit = _internalAuditPreparationRepository.FirstOrDefault(x => x.Id == item.InternalAuditId);
                item.InternalAuditPreparationDto= ObjectMapper.Map<InternalAuditPreparations.InternalAuditPreparation, InternalAuditPreparationDto>(InternalAudit); 

                if (item.CreatorId != null)
                {
                    var getuser = User.GetByIdAsync((Guid)item.CreatorId).Result;
                    item.Creator = ObjectMapper.Map<IdentityUser, IdentityUserDto>(getuser);
                }
                if (item.ApproveBy != null)
                {
                    var getuser = User.GetByIdAsync((Guid)item.CreatorId).Result;
                    item.UserApproveBy = ObjectMapper.Map<IdentityUser, IdentityUserDto>(getuser);
                }


            }
            if (!string.IsNullOrEmpty(input.Sorting))
            {
                var propertyInfo = typeof(InternalAuditApproveDto).GetProperty(input.Sorting);
                AuditApproves.OrderBy(p => propertyInfo.GetValue(p, null));
            }
            return new PagedResultDto<InternalAuditApproveDto>(
                totalCount,
                AuditApproves
            );
        }



        #endregion


    }
}
