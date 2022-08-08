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

namespace RMG.ComplianceSystem.Risks
{
    // [Authorize(ComplianceSystemPermissions.Risk.Default)]
    public class RiskAndOpportunityAppService :
        CrudAppService<
            RiskAndOpportunity, //The Risk entity
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
        #endregion
        // End Permissions
        //Start Properties and Constructor RiskAppService
        #region Start Properties and Constructor RiskAppService
        private readonly IRiskAndOpportunityRepository RiskAndOpportunityRepository;
        private readonly IdentityUserManager User;

        public RiskAndOpportunityAppService(IdentityUserManager _User,  IRiskAndOpportunityRepository _RiskAndOpportunityrepository) : base(_RiskAndOpportunityrepository)
        {
            RiskAndOpportunityRepository = _RiskAndOpportunityrepository;
            User = _User;
        }
        #endregion
        //End Properties and Constructor RiskAppService
        //Start Methods getbyId and GetListRiskByCategory
        #region Start Methods getbyId and GetListRiskByCategory
        public async Task<PagedResultDto<RiskAndOpportunityDto>> GetListRiskByFilterAsync(RiskOpportunityPagedAndSortedResultRequestDto input)
        {
            List<RiskAndOpportunityDto> Risks = new List<RiskAndOpportunityDto>();
            if (input.Type!=null)
            {
                //get Risk By CategoryId and Filters and Pagination
                var ListRisks = RiskAndOpportunityRepository.Where(x => x.Type == input.Type &&
                (x.NameAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) || (x.NameEn.Contains(input.Search) || input.Search.IsNullOrEmpty()))
                 .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping Risk to RiskDto
                Risks = ObjectMapper.Map<List<RiskAndOpportunity>, List<RiskAndOpportunityDto>>(ListRisks);
            }
            else
            {
                //get Risk By CategoryId and Filters and Pagination
              var  ListDoc = RiskAndOpportunityRepository.Where(x => 
                (x.NameAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) || (x.NameEn.Contains(input.Search) || input.Search.IsNullOrEmpty()))
                 .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping Risk to RiskDto
                Risks = ObjectMapper.Map<List<RiskAndOpportunity>, List<RiskAndOpportunityDto>>(ListDoc);
            }
           
            // instance of List of FullRiskDto
            List<RiskAndOpportunityDto> RiskDtos = new List<RiskAndOpportunityDto>();
            // instance of  List<RiskDto>
            List<RiskAndOpportunityDto> Risk=new List<RiskAndOpportunityDto>();
            // loop in Risks and get attacments by every Risk
            foreach (var item in Risks)
            {
                // instance of  creatorUserDto
                IdentityUserDto creatorUserDto = new IdentityUserDto();
                // instance of  UpdateUserDto
                IdentityUserDto UpdateUserDto = new IdentityUserDto();
                // check CreatorId not equal null 
                if (item.CreatorId != null)
                {
                    // get user by CreatorId
                    var getuser = User.GetByIdAsync((Guid)item.CreatorId).Result;
                    // Mapping IdentityUser to IdentityUserDto
                    creatorUserDto = ObjectMapper.Map<IdentityUser, IdentityUserDto>(getuser);
                 
                }
                else {
                    // in case CreatorId  equal null 
                    creatorUserDto = null;
                }

                if (item.LastModifierId != null)
                {   // get user by CreatorId
                    var getUdateuser = User.GetByIdAsync((Guid)item.LastModifierId).Result;
                    // Mapping IdentityUser to IdentityUserDto
                    UpdateUserDto = ObjectMapper.Map<IdentityUser, IdentityUserDto>(getUdateuser);
                }
                else
                {
                    // in case updateId  equal null 
                    UpdateUserDto = null;
                }

                // get object from RiskDto and Set Data
                RiskAndOpportunityDto riskdto = new RiskAndOpportunityDto
                {
                    // RiskID 
                    Id= item.Id,    
                    NameAr = item.NameAr,
                    NameEn = item.NameEn

                };
                // Add data of RiskDto in List of Risk
                Risk.Add(riskdto);
                
            }
            //Get the total count with Risk
            var totalCount = Risk.Count;
            // return RiskDtos and totalCount
            return new PagedResultDto<RiskAndOpportunityDto>(
                totalCount,
                Risk
            );
        }


        #endregion


    }
}
