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

namespace RMG.ComplianceSystem.Risks
{
    // [Authorize(ComplianceSystemPermissions.Risk.Default)]
    public class RiskAppService :
        CrudAppService<
            Risk, //The Risk entity
            RiskDto, //Used to show Risks
            Guid, //Primary key of the Risk entity
            RiskPagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdateRiskDto>, //Used to create/update a Risk
        IRiskAppService //implement the IRiskAppService
    {
        //   Start Permissions
        #region Start Permissions
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.Risk.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.Risk.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.Risk.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.Risk.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.Risk.Delete;
        #endregion
        // End Permissions
        //Start Properties and Constructor RiskAppService
        #region Start Properties and Constructor RiskAppService
        private readonly IRiskRepository Riskrepository;
        private readonly IdentityUserManager User;

        public RiskAppService(IdentityUserManager _User,  IRiskRepository _repository) : base(_repository)
        {
            Riskrepository = _repository;
            User = _User;
        }
        #endregion
        //End Properties and Constructor RiskAppService
        //Start Methods getbyId and GetListRiskByCategory
        #region Start Methods getbyId and GetListRiskByCategory
        public async Task<PagedResultDto<RiskDto>> GetListRiskByFilterAsync(RiskPagedAndSortedResultRequestDto input)
        {
            List<RiskDto> Risks = new List<RiskDto>();
            if (input.Level!=null)
            {
                //get Risk By CategoryId and Filters and Pagination
                var ListRisks = Riskrepository.Where(x => x.Level == input.Level &&
                (x.NameAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) || (x.NameEn.Contains(input.Search) || input.Search.IsNullOrEmpty()))
                 .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping Risk to RiskDto
                Risks = ObjectMapper.Map<List<Risk>, List<RiskDto>>(ListRisks);
            }
            else
            {
                //get Risk By CategoryId and Filters and Pagination
              var  ListDoc = Riskrepository.Where(x => 
                (x.NameAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) || (x.NameEn.Contains(input.Search) || input.Search.IsNullOrEmpty()))
                 .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping Risk to RiskDto
                Risks = ObjectMapper.Map<List<Risk>, List<RiskDto>>(ListDoc);
            }
           
            // instance of List of FullRiskDto
            List<RiskDto> RiskDtos = new List<RiskDto>();
            // instance of  List<RiskDto>
            List<RiskDto> Risk=new List<RiskDto>();
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
                RiskDto riskdto = new RiskDto
                {
                    // RiskID 
                    Id= item.Id,    
                    NameAr = item.NameAr,
                    NameEn = item.NameEn,
                    Level=item.Level,
                    LevelName =Enum.GetName(typeof(LevelRisk), item.Level),
                    CreationTime = item.CreationTime,
                    CreatorUserName = creatorUserDto.UserName,
                    UpdateUserName = UpdateUserDto.UserName,

                };
                // Add data of RiskDto in List of Risk
                Risk.Add(riskdto);
                
            }
            //Get the total count with Risk
            var totalCount = Risk.Count;
            // return RiskDtos and totalCount
            return new PagedResultDto<RiskDto>(
                totalCount,
                Risk
            );
        }


        #endregion


    }
}
