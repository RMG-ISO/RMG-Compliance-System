using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Users;
using Microsoft.AspNetCore.Authorization;
using RMG.ComplianceSystem.Attachments.Dtos;
using RMG.ComplianceSystem.Risks;
using RMG.ComplianceSystem.Risks.Dtos;
using RMG.ComplianceSystem.Permissions;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Identity;
using Volo.Abp.ObjectMapping;
using RMG.ComplianceSystem.Attachments;
using RMG.ComplianceSystem.Risks.Entity;
using RMG.ComplianceSystem.Risks.IRepository;
using RMG.ComplianceSystem.Risks.Enums;

namespace RMG.ComplianceSystem.Risks
{
    // [Authorize(ComplianceSystemPermissions.Risk.Default)]
    public class HistoryRiskAndOpportunityAppService :
        CrudAppService<
            HistoryRiskOpportunity, //The Risk entity
            HistoryRiskAndOpportunityDto, //Used to show Risks
            Guid, //Primary key of the Risk entity
            HistoryRiskOpportunityPagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdateHistoryRiskAndOpportunityDto>, //Used to create/update a Risk
        IHistoryRiskAndOpportunityAppService //implement the IRiskAppService
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
        //Start Properties and Constructor RiskAppService
        #region Start Properties and Constructor RiskAppService
        private readonly IHistoryRiskAndOpportunityRepository HistoryRiskRepository;
        private readonly IdentityUserManager User;

        public HistoryRiskAndOpportunityAppService(IdentityUserManager _User, IHistoryRiskAndOpportunityRepository _Historyrepository) : base(_Historyrepository)
        {
            HistoryRiskRepository = _Historyrepository;
            User = _User;
        }
        #endregion
        //End Properties and Constructor RiskAppService
        //Start Methods getbyId and GetListRiskByCategory
        #region Start Methods getbyId and GetListRiskByCategory
        public async Task<PagedResultDto<HistoryRiskAndOpportunityDto>> GetListHistoryByFilterAsync(HistoryRiskOpportunityPagedAndSortedResultRequestDto input)
        {
            List<HistoryRiskAndOpportunityDto> Risks = new List<HistoryRiskAndOpportunityDto>();
            if (input.UserId != null) {
                var ListRisks = HistoryRiskRepository.Where(x => x.RiskAndOpportunityId == input.RiskOpportunityId && x.UserId == input.UserId &&
                    (x.ActionName.Contains(input.Search) || input.Search.IsNullOrEmpty()))
                     .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping Risk to RiskDto
                Risks = ObjectMapper.Map<List<HistoryRiskOpportunity>, List<HistoryRiskAndOpportunityDto>>(ListRisks);
            } else
            {
                var ListRisks = HistoryRiskRepository.Where(x => x.RiskAndOpportunityId == input.RiskOpportunityId  &&
             (x.ActionName.Contains(input.Search) || input.Search.IsNullOrEmpty()))
              .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping Risk to RiskDto
                Risks = ObjectMapper.Map<List<HistoryRiskOpportunity>, List<HistoryRiskAndOpportunityDto>>(ListRisks);
            }
            //Get the total count with Risk
            var totalCount = Risks.Count;
            // return RiskDtos and totalCount
            return new PagedResultDto<HistoryRiskAndOpportunityDto>(
                totalCount,
                Risks
            );
        }


        #endregion


    }
}
