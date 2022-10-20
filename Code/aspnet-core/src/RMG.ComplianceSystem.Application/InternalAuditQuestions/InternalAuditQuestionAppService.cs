using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.InternalAuditQuestions.Dtos;
using RMG.ComplianceSystem.Permissions;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;
using RMG.ComplianceSystem.StaticData;

namespace RMG.ComplianceSystem.InternalAuditQuestions
{
    // [Authorize(ComplianceSystemPermissions.InternalAuditQuestion.Default)]
    public class InternalAuditQuestionAppService :
        CrudAppService<
            InternalAuditQuestion, //The InternalAuditQuestion entity
            InternalAuditQuestionDto, //Used to show InternalAuditQuestions
            Guid, //Primary key of the InternalAuditQuestion entity
            InternalAuditQuestionPagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdateInternalAuditQuestionDto>, //Used to create/update a InternalAuditQuestion
        IInternalAuditQuestionAppService //implement the IInternalAuditQuestionAppService
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
        //Start Properties and Constructor InternalAuditQuestionAppService
        #region Start Properties and Constructor InternalAuditQuestionAppService
        private readonly IInternalAuditQuestionRepository InternalAuditQuestionRepository;
        private readonly IdentityUserManager User;

        public InternalAuditQuestionAppService(IdentityUserManager _User, IInternalAuditQuestionRepository _InternalAuditQuestionRepository) : base(_InternalAuditQuestionRepository)
        {
            InternalAuditQuestionRepository = _InternalAuditQuestionRepository;
            User = _User;
        }
        #endregion
        //End Properties and Constructor InternalAuditQuestionAppService
        //Start Methods getbyId and GetListInternalAuditQuestionBy
        #region Start Methods getbyId and 
        public async Task<PagedResultDto<InternalAuditQuestionDto>> GetListQuestionByFilterAsync(InternalAuditQuestionPagedAndSortedResultRequestDto input)
        {
            int totalCount = 0;
            var ListQuestions = InternalAuditQuestionRepository.Where(x => 
                     ((x.QuestionTextAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) ||
                     (x.QuestionTextEn.Contains(input.Search) || input.Search.IsNullOrEmpty())))
                    .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
             var Questions = ObjectMapper.Map<List<InternalAuditQuestion>, List<InternalAuditQuestionDto>>(ListQuestions);
             var ListQuestion = InternalAuditQuestionRepository.ToList();
                totalCount = ListQuestion.Count;
           
            if (!string.IsNullOrEmpty(input.Sorting))
            {
                var propertyInfo = typeof(InternalAuditQuestionDto).GetProperty(input.Sorting);
                Questions.OrderBy(p => propertyInfo.GetValue(p, null));
            }
            return new PagedResultDto<InternalAuditQuestionDto>(
                totalCount,
                Questions
            );
        }

        #endregion


    }
}