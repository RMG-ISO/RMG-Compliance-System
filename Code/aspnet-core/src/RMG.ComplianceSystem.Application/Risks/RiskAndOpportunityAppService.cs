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
using Volo.Abp.Identity;
using RMG.ComplianceSystem.Risks.Entity;
using RMG.ComplianceSystem.Risks.IRepository;
using RMG.ComplianceSystem.RiskTreatments;
using System.Linq.Dynamic.Core;
using RMG.ComplianceSystem.StaticData;

namespace RMG.ComplianceSystem.Risks
{
    // [Authorize(ComplianceSystemPermissions.Risk.Default)]
    public class RiskAndOpportunityAppService :
        CrudAppService<
            RiskOpportunity, //The Risk entity
            RiskAndOpportunityDto, //Used to show Risks
            Guid, //Primary key of the Risk entity
            RiskOpportunityPagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdateRiskAndOpportunityDto>, //Used to create/update a Risk
        IRiskAndOpportunityAppService //implement the IRiskAppService
    {
        //   Start Permissions
        #region Start Permissions
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Delete;
        protected string ReEvaluationPolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.ReEvaluation;
        protected string HistoryPolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.History;
        protected string DefinitionPolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Definition;
        protected string AnalysisPolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Analysis;
        protected string EvaluationPolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Evaluation;
        protected string TreatmentPolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Treatment;
        protected string ReviewPolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Review;

        #endregion
        // End Permissions
        //Start Properties and Constructor RiskAppService
        #region Start Properties and Constructor RiskAppService
        private readonly IRiskAndOpportunityRepository RiskAndOpportunityRepository;
        private readonly IdentityUserManager User;
        private readonly IStaticDataRepository StaticDatarepository;

        public RiskAndOpportunityAppService(IdentityUserManager _User, IStaticDataRepository _StaticDatarepository, IRiskAndOpportunityRepository _RiskAndOpportunityrepository) : base(_RiskAndOpportunityrepository)
        {
            RiskAndOpportunityRepository = _RiskAndOpportunityrepository;
            User = _User;
            StaticDatarepository = _StaticDatarepository;
        }
        #endregion
        //End Properties and Constructor RiskAppService
        //Start Methods getbyId and GetListRiskBy
        #region Start Methods getbyId and GetListRisk
        public async Task<PagedResultDto<RiskAndOpportunityDto>> GetListRiskByFilterAsync(RiskOpportunityPagedAndSortedResultRequestDto input)
        {
            List<RiskAndOpportunityDto> Risks = new List<RiskAndOpportunityDto>();
            if (input.Type!=null)
            {
                //get Risk By CategoryId and Filters and Pagination
                var ListRisks = RiskAndOpportunityRepository.Where(x =>x.IsDeleted==false&& x.Type == input.Type &&
                ((x.NameAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) || (x.NameEn.Contains(input.Search) || input.Search.IsNullOrEmpty())))
                 .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping RiskAndOpportunity to RiskAndOpportunityDto
                Risks = ObjectMapper.Map<List<RiskOpportunity>, List<RiskAndOpportunityDto>>(ListRisks);
            }
            else
            {
                //get Risk By CategoryId and Filters and Pagination
              var  ListDoc = RiskAndOpportunityRepository.Where(x => x.IsDeleted == false &&
               ((x.NameAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) || (x.NameEn.Contains(input.Search) || input.Search.IsNullOrEmpty())))
                 .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping RiskAndOpportunity to RiskAndOpportunityDto
                Risks = ObjectMapper.Map<List<RiskOpportunity>, List<RiskAndOpportunityDto>>(ListDoc);
            }
            var RisksData = new List<RiskAndOpportunityDto>();
            foreach (var item in Risks)
            {
                var Risk = new RiskAndOpportunityDto();
                Risk = item;
                if (Risk.CreatorId != null)
                {
                    var getuser = User.GetByIdAsync((Guid)Risk.CreatorId).Result;
                    Risk.Creator = ObjectMapper.Map<IdentityUser, IdentityUserDto>(getuser);
                }
                if (Risk.OwnerId!=null) {
                    var getuser = User.GetByIdAsync((Guid)item.OwnerId).Result;
                    Risk.OwnerName= getuser.UserName;
                }
                if (Risk.PotentialRisk != null)
                {
                    var StaticData = StaticDatarepository.Where(t=>t.Id==(Guid)item.PotentialRisk).FirstOrDefault();
                    Risk.PotentialNameAr= StaticData.NameAr;
                    Risk.PotentialNameEn= StaticData.NameEn;
                }
                RisksData.Add(Risk);
            }

             //Get the total count with Risk
             var totalCount = RisksData.Count;
            // return RiskDtos and totalCount
            return new PagedResultDto<RiskAndOpportunityDto>(
                totalCount,
                RisksData
            );
        }


        public async Task<PagedResultDto<RiskAndOpportunityDto>> GetRisksByFilterAsync(RiskOpportunityPagedAndSortedResultRequestDto input)
        {
            List<RiskAndOpportunityDto> Risks = new List<RiskAndOpportunityDto>();
            
                //get Risk By CategoryId and Filters and Pagination
                var ListRisks = RiskAndOpportunityRepository.Where(x =>  x.Type == input.Type)
                 .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping RiskAndOpportunity to RiskAndOpportunityDto
                Risks = ObjectMapper.Map<List<RiskOpportunity>, List<RiskAndOpportunityDto>>(ListRisks);
            
            var RisksData = new List<RiskAndOpportunityDto>();
            foreach (var item in Risks)
            {
                var Risk = new RiskAndOpportunityDto();
                Risk = item;
                if (Risk.CreatorId != null)
                {
                    var getuser = User.GetByIdAsync((Guid)Risk.CreatorId).Result;
                    Risk.Creator = ObjectMapper.Map<IdentityUser, IdentityUserDto>(getuser);
                }
                if (Risk.OwnerId != null)
                {
                    var getuser = User.GetByIdAsync((Guid)item.OwnerId).Result;
                    Risk.OwnerName = getuser.UserName;
                }
                if (Risk.PotentialRisk != null)
                {
                    var StaticData = StaticDatarepository.Where(t => t.Id == (Guid)item.PotentialRisk).FirstOrDefault();
                    Risk.PotentialNameAr = StaticData.NameAr;
                    Risk.PotentialNameEn = StaticData.NameEn;
                }
                RisksData.Add(Risk);
            }
            MessagingHub messagingHub = new MessagingHub();
            messagingHub.SendMessage("", RisksData);
            //Get the total count with Risk
            var totalCount = RisksData.Count;
            // return RiskDtos and totalCount
            return new PagedResultDto<RiskAndOpportunityDto>(
                totalCount,
                RisksData
            );
        }

     
        #endregion


    }
}
