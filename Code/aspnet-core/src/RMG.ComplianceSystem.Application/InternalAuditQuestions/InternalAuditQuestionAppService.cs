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
using RMG.ComplianceSystem.Frameworks.Dtos;
using RMG.ComplianceSystem.Frameworks;
using RMG.ComplianceSystem.InternalAuditQuestionLists;

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
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditQuestion.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditQuestion.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditQuestion.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditQuestion.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditQuestion.Delete;
        #endregion
        // End Permissions
        //Start Properties and Constructor InternalAuditQuestionAppService
        #region Start Properties and Constructor InternalAuditQuestionAppService
        private readonly IInternalAuditQuestionRepository InternalAuditQuestionRepository;
        private readonly IInternalAuditQuestionListRepository _internalAuditQuestionListRepository;
        private readonly IdentityUserManager User;
        private readonly IFrameworkRepository _FrameworkRepository;

        public InternalAuditQuestionAppService(IdentityUserManager _User, IInternalAuditQuestionListRepository internalAuditQuestionListRepository, IFrameworkRepository FrameworkRepository, IInternalAuditQuestionRepository _InternalAuditQuestionRepository) : base(_InternalAuditQuestionRepository)
        {
            InternalAuditQuestionRepository = _InternalAuditQuestionRepository;
            User = _User;
            _FrameworkRepository= FrameworkRepository;
            _internalAuditQuestionListRepository = internalAuditQuestionListRepository;
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
            foreach (var item in Questions)
            {

                if (item.CreatorId != null)
                {
                    var getuser = User.GetByIdAsync((Guid)item.CreatorId).Result;
                    item.Creator = ObjectMapper.Map<IdentityUser, IdentityUserDto>(getuser);
                }
                if (item.FrameworkId != null)
                {
                    var Framework = _FrameworkRepository.FirstOrDefault(t => t.Id == item.FrameworkId);
                    item.Framework = ObjectMapper.Map<Framework, FrameworkDto>(Framework);
                }
                if (item.Id != null)
                {
                    var QuestionIsUsed = _internalAuditQuestionListRepository.FirstOrDefault(t => t.InternalAuditQuestionId == item.Id);
                    if (QuestionIsUsed != null) { item.CanDelete = false; }
                    else { item.CanDelete = true; } 
                }

            }
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


        public async Task<InternalAuditQuestionDto> GetQuestionByIdAsync(Guid Id)
        {
            var ListQuestions = InternalAuditQuestionRepository.FirstOrDefault(x =>x.Id==Id);
            var Questions = ObjectMapper.Map<InternalAuditQuestion, InternalAuditQuestionDto>(ListQuestions);
            return Questions;
        }

        #endregion


    }
}
