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
using RMG.ComplianceSystem.Risks.Enums;
using Microsoft.AspNetCore.Mvc;
using RMG.ComplianceSystem.Departments;
using Volo.Abp.Domain.Repositories;

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
        private readonly IDepartmentRepository departmentRepository;
        public RiskAndOpportunityAppService(IdentityUserManager _User, IStaticDataRepository _StaticDatarepository, IDepartmentRepository DepartmentRepository, IRiskAndOpportunityRepository _RiskAndOpportunityrepository) : base(_RiskAndOpportunityrepository)
        {
            RiskAndOpportunityRepository = _RiskAndOpportunityrepository;
            User = _User;
            StaticDatarepository = _StaticDatarepository;
            departmentRepository = DepartmentRepository;
        }
        #endregion
        //End Properties and Constructor RiskAppService

        //Start Methods getbyId and GetListRiskBy
        #region Start Methods getbyId and GetListRisk
        public async Task<PagedResultDto<RiskAndOpportunityDto>> GetListRiskByFilterAsync(RiskOpportunityPagedAndSortedResultRequestDto input)
        {
            List<RiskAndOpportunityDto> Risks = new List<RiskAndOpportunityDto>();
            int totalCount = 0;
            if (input.Type != null)
            {
                //get Risk By CategoryId and Filters and Pagination
                var ListRisks = (await RiskAndOpportunityRepository.GetQueryableAsync())
                    .WhereIf(input.DepartmentId != null, t => t.DepartmentId == input.DepartmentId)
                    .WhereIf(input.Status != null, t => t.status == input.Status)
                    .WhereIf(input.Potential != null, t => t.Potential == input.Potential|| t.Potential == input.PotentialValue)
                    .WhereIf(input.ReEvaluation != null,t=>t.ReEvaluation==input.ReEvaluation)
                    .WhereIf(input.UserId != null, t => t.OwnerId == input.UserId)
                    .Where(x => x.Type == input.Type &&
                     ((x.NameAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) || 
                     (x.NameEn.Contains(input.Search) || input.Search.IsNullOrEmpty())))
                    .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping RiskAndOpportunity to RiskAndOpportunityDto
                Risks = ObjectMapper.Map<List<RiskOpportunity>, List<RiskAndOpportunityDto>>(ListRisks);
                var risk = (await RiskAndOpportunityRepository.GetQueryableAsync()).Where(x => x.Type == input.Type).ToList();
                totalCount = risk.Count;
            }
            else
            {
                //get Risk By CategoryId and Filters and Pagination
                var ListDoc = (await RiskAndOpportunityRepository.GetQueryableAsync())
                    .WhereIf(input.DepartmentId != null, t => t.DepartmentId == input.DepartmentId)
                    .WhereIf(input.Status != null, t => t.status == input.Status)
                    .WhereIf(input.Potential != null, t => t.Potential == input.Potential || t.Potential == input.PotentialValue || t.ReEvaluation == input.Potential)
                    .WhereIf(input.UserId != null, t => t.OwnerId == input.UserId)
                    .Where(x =>
                ((x.NameAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) || (x.NameEn.Contains(input.Search) || input.Search.IsNullOrEmpty())))
                   .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping RiskAndOpportunity to RiskAndOpportunityDto
                Risks = ObjectMapper.Map<List<RiskOpportunity>, List<RiskAndOpportunityDto>>(ListDoc);
                var risk = (await RiskAndOpportunityRepository.GetQueryableAsync()).ToList();
                totalCount = risk.Count;
            }
            if (!string.IsNullOrEmpty(input.Sorting))
            {
                var propertyInfo = typeof(RiskAndOpportunityDto).GetProperty(input.Sorting);
                Risks.OrderBy(p => propertyInfo.GetValue(p, null));
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
                if (Risk.OwnerId != null)
                {
                    var getuser = User.GetByIdAsync((Guid)item.OwnerId).Result;
                    Risk.OwnerName = getuser.UserName;
                }
                if (Risk.Potential != null)
                {
                    Risk.PotentialNameAr = getPotentialName(Risk.Potential).Result.NameAr;
                    Risk.PotentialNameEn = getPotentialName(Risk.Potential).Result.NameEn;
                }
                if (Risk.ReEvaluation != null)
                {
                    Risk.PotentialNameAr = getPotentialName(Risk.ReEvaluation).Result.NameAr;
                    Risk.PotentialNameEn = getPotentialName(Risk.ReEvaluation).Result.NameEn;
                }
                if (Risk.DepartmentId != null)
                {
                    Risk.DepartmentName = ( await departmentRepository.FirstOrDefaultAsync(t => t.Id == Risk.DepartmentId)).Name;
                }
                RisksData.Add(Risk);
            }

            return new PagedResultDto<RiskAndOpportunityDto>(
                totalCount,
                RisksData
            );
        }


        //Start Methods getbyId and GetListRiskByOwnerId
        public async Task<PagedResultDto<RiskAndOpportunityDto>> GetListRiskByOwnerIdAsync(RiskOpportunityPagedAndSortedResultRequestDto input)
        {
            List<RiskAndOpportunityDto> Risks = new List<RiskAndOpportunityDto>();
            int totalCount = 0;
            if (input.Type != null)
            {
                //get Risk By CategoryId and Filters and Pagination
                var ListRisks = (await RiskAndOpportunityRepository.GetQueryableAsync())
                    .WhereIf(input.OwnerId != null, t => t.OwnerId == input.OwnerId)
                    .WhereIf(input.DepartmentId != null, t => t.DepartmentId == input.DepartmentId)
                    .WhereIf(input.Status != null, t => t.status == input.Status)
                    .WhereIf(input.Potential != null, t => t.Potential == input.Potential || t.Potential == input.PotentialValue)
                    .WhereIf(input.ReEvaluation != null, t => t.ReEvaluation == input.ReEvaluation)
                    .WhereIf(input.UserId != null, t => t.OwnerId == input.UserId)
                    .Where(x => x.Type == input.Type &&
                     ((x.NameAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) ||
                     (x.NameEn.Contains(input.Search) || input.Search.IsNullOrEmpty())))
                    .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping RiskAndOpportunity to RiskAndOpportunityDto
                Risks = ObjectMapper.Map<List<RiskOpportunity>, List<RiskAndOpportunityDto>>(ListRisks);
                var risk = (await RiskAndOpportunityRepository.GetQueryableAsync()).Where(x => x.Type == input.Type).ToList();
                totalCount = risk.Count;
            }
            else
            {
                //get Risk By CategoryId and Filters and Pagination
                var ListDoc = (await RiskAndOpportunityRepository.GetQueryableAsync())
                    .WhereIf(input.OwnerId != null, t => t.OwnerId == input.OwnerId)
                    .WhereIf(input.DepartmentId != null, t => t.DepartmentId == input.DepartmentId)
                    .WhereIf(input.Status != null, t => t.status == input.Status)
                    .WhereIf(input.Potential != null, t => t.Potential == input.Potential || t.Potential == input.PotentialValue || t.ReEvaluation == input.Potential)
                    .WhereIf(input.UserId != null, t => t.OwnerId == input.UserId)
                    .Where(x =>
                ((x.NameAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) || (x.NameEn.Contains(input.Search) || input.Search.IsNullOrEmpty())))
                   .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping RiskAndOpportunity to RiskAndOpportunityDto
                Risks = ObjectMapper.Map<List<RiskOpportunity>, List<RiskAndOpportunityDto>>(ListDoc);
                var risk = (await RiskAndOpportunityRepository.GetQueryableAsync()).ToList();
                totalCount = risk.Count;
            }
            if (!string.IsNullOrEmpty(input.Sorting))
            {
                var propertyInfo = typeof(RiskAndOpportunityDto).GetProperty(input.Sorting);
                Risks.OrderBy(p => propertyInfo.GetValue(p, null));
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
                if (Risk.OwnerId != null)
                {
                    var getuser = User.GetByIdAsync((Guid)item.OwnerId).Result;
                    Risk.OwnerName = getuser.UserName;
                }
                if (Risk.Potential != null)
                {
                    Risk.PotentialNameAr = getPotentialName(Risk.Potential).Result.NameAr;
                    Risk.PotentialNameEn = getPotentialName(Risk.Potential).Result.NameEn;
                }
                if (Risk.ReEvaluation != null)
                {
                    Risk.PotentialNameAr = getPotentialName(Risk.ReEvaluation).Result.NameAr;
                    Risk.PotentialNameEn = getPotentialName(Risk.ReEvaluation).Result.NameEn;
                }
                if (Risk.DepartmentId != null)
                {
                    Risk.DepartmentName =( await departmentRepository.FirstOrDefaultAsync(t => t.Id == Risk.DepartmentId)).Name;
                }
                RisksData.Add(Risk);
            }

            return new PagedResultDto<RiskAndOpportunityDto>(
                totalCount,
                RisksData
            );
        }


        public async Task<getEnumTypeStaticData> getPotentialName(int? Potential)
        {
            var Potentials = new List<getEnumTypeStaticData>();
            Potentials.Add(new getEnumTypeStaticData { Id = 4, NameEn = "Medium", NameAr = "متوسط" });
            Potentials.Add(new getEnumTypeStaticData { Id = 8, NameEn = "High", NameAr = "عالي" });
            Potentials.Add(new getEnumTypeStaticData { Id = 12, NameEn = "Very High", NameAr = "عالي جدا" });
            Potentials.Add(new getEnumTypeStaticData { Id = 16, NameEn = "Very High", NameAr = "عالي جدا" });
            Potentials.Add(new getEnumTypeStaticData { Id = 3, NameEn = "Low", NameAr = "ضعيف" });
            Potentials.Add(new getEnumTypeStaticData { Id = 6, NameEn = "Medium", NameAr = "متوسط" });
            Potentials.Add(new getEnumTypeStaticData { Id = 9, NameEn = "High", NameAr = "عالي" });
            Potentials.Add(new getEnumTypeStaticData { Id = 16, NameEn = "Very High", NameAr = "عالي جدا" });
            Potentials.Add(new getEnumTypeStaticData { Id = 2, NameEn = "Low", NameAr = "ضعيف" });
            Potentials.Add(new getEnumTypeStaticData { Id = 4, NameEn = "Medium", NameAr = "متوسط" });
            Potentials.Add(new getEnumTypeStaticData { Id = 6, NameEn = "Medium", NameAr = "متوسط" });
            Potentials.Add(new getEnumTypeStaticData { Id = 8, NameEn = "High", NameAr = "عالي" });
            Potentials.Add(new getEnumTypeStaticData { Id = 1, NameEn = "very Low", NameAr = "ضعيف جدا" });
            Potentials.Add(new getEnumTypeStaticData { Id = 2, NameEn = "Low", NameAr = "ضعيف" });
            Potentials.Add(new getEnumTypeStaticData { Id = 3, NameEn = "Low", NameAr = "ضعيف" });
            Potentials.Add(new getEnumTypeStaticData { Id = 4, NameEn = "Medium", NameAr = "متوسط" });
            var PotentialData = Potentials.FirstOrDefault(t => t.Id == Potential);
            return PotentialData;

        }
        public async Task<getMatrix> getMatrix(int matrix)
        {
            var getdata = new getMatrix();
            var Types = new List<getEnumTypeStaticData>();
            Types.Add(new getEnumTypeStaticData { Id = 4, NameAr = "احتمالية ضعيفة", NameEn = "Low probability" });
            Types.Add(new getEnumTypeStaticData { Id = 3, NameAr = "احتمالية متوسطة", NameEn = "Medium probability" });
            Types.Add(new getEnumTypeStaticData { Id = 2, NameAr = "احتمالية عالية", NameEn = "High probability" });
            Types.Add(new getEnumTypeStaticData { Id = 1, NameAr = "احتمالية عالية جداً", NameEn = "Very high probability" });

            var Impacts = new List<getEnumTypeStaticData>();
            Impacts.Add(new getEnumTypeStaticData { Id = 1, NameAr = "شدة ضعيفة", NameEn = "Low impact" });
            Impacts.Add(new getEnumTypeStaticData { Id = 2, NameAr = "شدة متوسطة", NameEn = "Medium impact" });
            Impacts.Add(new getEnumTypeStaticData { Id = 3, NameAr = "شدة عالية", NameEn = "High impact" });
            Impacts.Add(new getEnumTypeStaticData { Id = 4, NameAr = "شدة عالية جداً", NameEn = "Very high impact" });

            var likehood = Types.Take(matrix);
            var Impact = Impacts.Take(matrix).Reverse();
            getdata.Impact = Impact.ToList();
            getdata.likehood = likehood.ToList();
            return getdata;
        }

        #region Dahboard

        [HttpGet]
        public async Task<PagedResultDto<RiskAndOpportunityDto>> AllRisksAndOpportunities(RiskOpportunityPagedAndSortedResultRequestDto input)
        {
            var ListRisks = (await RiskAndOpportunityRepository.GetQueryableAsync()).Where(t => t.Type == input.Type).ToList();
            var Risks = ObjectMapper.Map<List<RiskOpportunity>, List<RiskAndOpportunityDto>>(ListRisks);
            return new PagedResultDto<RiskAndOpportunityDto>(
              ListRisks.Count,
              Risks
          );
        }

        [HttpGet]
        public async Task<Dictionary<string, int>> GetMitigationRisksAndOpportunities(RiskOpportunityPagedAndSortedResultRequestDto input)
        {
            var openClose = new Dictionary<string, int>();
            var AllRisks = (await RiskAndOpportunityRepository.GetQueryableAsync()).Where(t => t.Type == input.Type).ToList();
            openClose.Add("Total", AllRisks.Count);

            int riskItemVeryLow = 0;
            int riskItemLow = 0;
            int riskItemMeduim = 0;
            int riskItemHigh = 0;
            int riskItemVeryHigh = 0;
            int reEvaluationVeryLow = 0;
            int reEvaluationLow = 0;
            int reEvaluationMeduim = 0;
            int reEvaluationHigh = 0;
            int reEvaluationVeryHigh = 0;
            foreach (var item in AllRisks)
            {
                if (item.ReEvaluation == null)
                {
                    if (item.Potential == 1) riskItemVeryLow += 1;
                    else if (item.Potential == 2 || item.Potential == 3) riskItemLow += 1;
                    else if (item.Potential == 4 || item.Potential == 6) riskItemMeduim += 1;
                    else if (item.Potential == 8 || item.Potential == 9) riskItemHigh += 1;
                    else if (item.Potential == 12 || item.Potential == 16) riskItemVeryHigh += 1;
                }
                else
                {
                    if (item.ReEvaluation == 1) reEvaluationVeryLow += 1;
                    else if (item.ReEvaluation == 2) reEvaluationLow += 1;
                    else if (item.ReEvaluation == 4) reEvaluationMeduim += 1;
                    else if (item.ReEvaluation == 8) reEvaluationHigh += 1;
                    else if (item.ReEvaluation == 12) reEvaluationVeryHigh += 1;
                }
            }
            openClose.Add("riskItemVeryLow", riskItemVeryLow);
            openClose.Add("riskItemLow", riskItemLow);
            openClose.Add("riskItemMeduim", riskItemMeduim);
            openClose.Add("riskItemHigh", riskItemHigh);
            openClose.Add("riskItemVeryHigh", riskItemVeryHigh);
            openClose.Add("reEvaluationVeryLow", reEvaluationVeryLow);
            openClose.Add("reEvaluationLow", reEvaluationLow);
            openClose.Add("reEvaluationMeduim", reEvaluationMeduim);
            openClose.Add("reEvaluationHigh", reEvaluationHigh);
            openClose.Add("reEvaluationVeryHigh", reEvaluationVeryHigh);
            return openClose;
        }

        [HttpGet]
        public async Task<Dictionary<string, int>> OpenCloseRisksAndOpportunities(RiskOpportunityPagedAndSortedResultRequestDto input)
        {
            var openClose = new Dictionary<string, int>();
            var AllRisks = (await RiskAndOpportunityRepository.GetQueryableAsync()).Where(t => t.Type == input.Type).ToList();
            var OpenRisks = (await RiskAndOpportunityRepository.GetQueryableAsync()).Where(t => t.Type == input.Type && t.status == 1).ToList();
            var CloseRisks = (await RiskAndOpportunityRepository.GetQueryableAsync()).Where(t => t.Type == input.Type && t.status == 2).ToList();
            openClose.Add("Total", AllRisks.Count);
            openClose.Add("Open", OpenRisks.Count);
            openClose.Add("Close", CloseRisks.Count);
            return openClose;
        }

        [HttpGet]
        public async Task<Dictionary<string, int>> TreatmentRisksAndOpportunities(RiskOpportunityPagedAndSortedResultRequestDto input)
        {
            var Treatment = new Dictionary<string, int>();
            var AllRisks = (await RiskAndOpportunityRepository.GetQueryableAsync()).Where(t => t.Type == input.Type).ToList();
            var treatmentRisks = (await RiskAndOpportunityRepository.GetQueryableAsync()).Where(t => t.Type == input.Type && t.IsTreatment == true).ToList();
            var NotreatmentRisks = (await RiskAndOpportunityRepository.GetQueryableAsync()).Where(t => t.Type == input.Type && t.IsTreatment == false).ToList();
            Treatment.Add("Total", AllRisks.Count);
            Treatment.Add("treatmentRisks", treatmentRisks.Count);
            Treatment.Add("NotreatmentRisks", NotreatmentRisks.Count);
            return Treatment;
        }

        #endregion

        #endregion




    }
}
