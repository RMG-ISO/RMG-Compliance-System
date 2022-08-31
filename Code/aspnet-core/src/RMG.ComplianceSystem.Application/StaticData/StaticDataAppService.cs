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

namespace RMG.ComplianceSystem.StaticData
{
    // [Authorize(ComplianceSystemPermissions.Risk.Default)]
    public class StaticDataAppService :
        CrudAppService<
            StaticDatatb, //The Risk entity
            StaticDataDto, //Used to show Risks
            Guid, //Primary key of the Risk entity
            StaticDataPagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdateStaticDataDto>, //Used to create/update a Risk
        IStaticDataAppService //implement the IRiskAppService
    {
        //   Start Permissions
        #region Start Permissions
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.StaticData.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.StaticData.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.StaticData.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.StaticData.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.StaticData.Delete;
        #endregion
        // End Permissions
        //Start Properties and Constructor RiskAppService
        #region Start Properties and Constructor RiskAppService
        private readonly IStaticDataRepository StaticDataRepository;
        private readonly IdentityUserManager User;

        public StaticDataAppService(IdentityUserManager _User,  IStaticDataRepository _StaticDatarepository) : base(_StaticDatarepository)
        {
            StaticDataRepository = _StaticDatarepository;
            User = _User;
        }
        #endregion
        //End Properties and Constructor RiskAppService
        //Start Methods getbyId and GetListRiskByCategory
        #region Start Methods getbyId and GetListRiskByCategory
        public async Task<PagedResultDto<StaticDataDto>> GetListByFilterAsync(StaticDataPagedAndSortedResultRequestDto input)
        {
            List<StaticDataDto> StaticData = new List<StaticDataDto>();
            if (input.Type!=null)
            {
                //get Risk By CategoryId and Filters and Pagination
                var ListRisks = StaticDataRepository.Where(x => x.Type == input.Type && x.IsDeleted == false && ((x.ParentId==input.ParentId)|| input.ParentId==null) &&
                ((x.NameAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) || (x.NameEn.Contains(input.Search) || input.Search.IsNullOrEmpty())))
                 .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping Risk to RiskDto
                StaticData = ObjectMapper.Map<List<StaticDatatb>, List<StaticDataDto>>(ListRisks);
            }
            else
            {
                //get Risk By CategoryId and Filters and Pagination
              var  ListDoc = StaticDataRepository.Where(x => x.IsDeleted == false &&
                (x.NameAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) || (x.NameEn.Contains(input.Search) || input.Search.IsNullOrEmpty()))
                 .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping Risk to RiskDto
                StaticData = ObjectMapper.Map<List<StaticDatatb>, List<StaticDataDto>>(ListDoc);
            }
            var Data = new List<StaticDataDto>();
            foreach (var item in StaticData)
            {
                var stData = new StaticDataDto();
                stData = item;
                if (stData.CreatorId != null)
                {
                    var getuser = User.GetByIdAsync((Guid)stData.CreatorId).Result;
                    stData.Creator = ObjectMapper.Map<IdentityUser, IdentityUserDto>(getuser);
                }


                Data.Add(stData);
            }
            //Get the total count with Risk
            var totalCount = Data.Count;
            // return RiskDtos and totalCount
            return new PagedResultDto<StaticDataDto>(
                totalCount,
                Data
            );
        }

        public async Task<List<getEnumTypeStaticData>> getTypeStaticData()
        { 
        var Types=new List<getEnumTypeStaticData>();
            //foreach (TypeStaticData type in (TypeStaticData[])Enum.GetValues(typeof(TypeStaticData)))
            //{

            //Types.Add(new getEnumTypeStaticData { Id = 2, NameAr = "الادارات", NameEn = "Managements" });
            Types.Add(new getEnumTypeStaticData { Id = 8, NameAr = "القطاعات", NameEn = "Sectors" });
            Types.Add(new getEnumTypeStaticData { Id = 1, NameAr = "تصنيف الخطر", NameEn = "Categories" });
            Types.Add(new getEnumTypeStaticData { Id = 2, NameAr = "إحتمال الخطر", NameEn = "Likelihood" });
            Types.Add(new getEnumTypeStaticData { Id = 4, NameAr = "تأثير الخطر", NameEn = "Impacts" });
            Types.Add(new getEnumTypeStaticData { Id = 3, NameAr = " شدة الخطر", NameEn = "Potentials" });
            Types.Add(new getEnumTypeStaticData { Id = 5, NameAr = " ضوابط الخطر", NameEn = "ControlAssessment" });
            Types.Add(new getEnumTypeStaticData { Id = 6, NameAr = "معالجة الخطر", NameEn = "Treatment Option" });
            Types.Add(new getEnumTypeStaticData { Id = 7, NameAr = " سياق الخطر", NameEn = "Risk Context" });
          
            //}
            return Types;
        }
        #endregion


    }
}
