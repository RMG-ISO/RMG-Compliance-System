using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Permissions;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;
using RMG.ComplianceSystem.InternalAuditQuestionLists.Header.Dto;
using RMG.ComplianceSystem.InternalAuditMenuQuestions;
using RMG.ComplianceSystem.InternalAuditQuestionLists.Footer.Dto;
using RMG.ComplianceSystem.InternalAuditQuestions;
using Volo.Abp.ObjectMapping;

namespace RMG.ComplianceSystem.InternalAuditQuestionLists
{
    public class InternalAuditQuestionListAppService :
        CrudAppService<
            InternalAuditMenuQuestion, //The InternalAuditMenuQuestion entity
            InternalAuditMenuQuestionDto, //Used to show InternalAuditMenuQuestions
            Guid, //Primary key of the InternalAuditMenuQuestion entity
            InternalAuditMenuQuestionPagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdateInternalAuditMenuQuestionDto>, //Used to create/update a InternalAuditMenuQuestion
        IInternalAuditMenuQuestionAppService //implement the IInternalAuditMenuQuestionAppService
    {
        //   Start Permissions

        #region Start Permissions
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditQuestionList.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditQuestionList.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditQuestionList.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditQuestionList.Edit;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditQuestionList.Delete;
        #endregion

        // End Permissions
        //Start Properties and Constructor InternalAuditMenuQuestionAppService
        #region Start Properties and Constructor InternalAuditMenuQuestionAppService
        private readonly IInternalAuditMenuQuestionRepository InternalAuditMenuQuestionRepository;
        private readonly IInternalAuditQuestionRepository _InternalAuditQuestionRepository;
        private readonly IInternalAuditQuestionListRepository _internalAuditQuestionListRepository;
        private readonly IInternalAuditQuestionListManager _internalAuditQuestionListManager;

        private readonly IdentityUserManager User;

        public InternalAuditQuestionListAppService(IdentityUserManager _User, IInternalAuditQuestionRepository internalAuditQuestionRepository, IInternalAuditQuestionListManager internalAuditQuestionListManager, IInternalAuditQuestionListRepository InternalAuditQuestionListRepository, IInternalAuditMenuQuestionRepository _InternalAuditMenuQuestionRepository) : base(_InternalAuditMenuQuestionRepository)
        {
            InternalAuditMenuQuestionRepository = _InternalAuditMenuQuestionRepository;
            _internalAuditQuestionListRepository = InternalAuditQuestionListRepository;
            _internalAuditQuestionListManager = internalAuditQuestionListManager;
            _InternalAuditQuestionRepository = internalAuditQuestionRepository;
            User = _User;
        }
        #endregion
        //End Properties and Constructor InternalAuditMenuQuestionAppService
        //Start Methods getbyId and GetListInternalAuditMenuQuestionBy
        #region Start Methods 


        public override async Task<InternalAuditMenuQuestionDto> CreateAsync(CreateUpdateInternalAuditMenuQuestionDto input)
        {

            var entity = await MapToEntityAsync(input);
            TryToSetTenantId(entity);
            entity.IsEditable = true;
            await Repository.InsertAsync(entity, autoSave: true);

            if (input.QuestionsIds != null && input.QuestionsIds.Count > 0)
            {
                List<InternalAuditQuestionList> ModelList = new List<InternalAuditQuestionList>();
                foreach (var question in input.QuestionsIds)
                {
                    var internalAuditQuestionList = new InternalAuditQuestionList(entity.Id, question);
                    ModelList.Add(internalAuditQuestionList);
                }
                await _internalAuditQuestionListRepository.InsertManyAsync(ModelList, autoSave: true);
            }

            var questionList = await GetEntityByIdAsync(entity.Id);

            return await MapToGetOutputDtoAsync(questionList);
        }

        /// <summary>
        /// this method to update item of context
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public override async Task<InternalAuditMenuQuestionDto> UpdateAsync(Guid id, CreateUpdateInternalAuditMenuQuestionDto input)
        {
            await _internalAuditQuestionListManager.CanUpdate(id);
            var entity = await GetEntityByIdAsync(id);

            await MapToEntityAsync(input, entity);

            await Repository.UpdateAsync(entity, autoSave: true);

            #region [Questions]

            await _internalAuditQuestionListRepository.DeleteAsync(entity.Id, autoSave: true);

            if (input.QuestionsIds != null && input.QuestionsIds.Count > 0)
            {
                List<InternalAuditQuestionList> ModelList = new List<InternalAuditQuestionList>();
                foreach (var question in input.QuestionsIds)
                {
                    var internalAuditQuestionList = new InternalAuditQuestionList(entity.Id, question);
                    ModelList.Add(internalAuditQuestionList);
                }
                await _internalAuditQuestionListRepository.InsertManyAsync(ModelList, autoSave: true);
            }


            #endregion



            var questionList = await GetEntityByIdAsync(id);

            return await MapToGetOutputDtoAsync(questionList);
        }
       /// <summary>
       /// 
       /// </summary>
       /// <param name="input"></param>
       /// <returns></returns>
        public async Task<PagedResultDto<InternalAuditMenuQuestionDto>> GetListQuestionByFilterAsync(InternalAuditMenuQuestionPagedAndSortedResultRequestDto input)
        {
            int totalCount = 0;
            var ListQuestions = InternalAuditMenuQuestionRepository.Where(x => 
                     ((x.MenuTextAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) ||
                     (x.MenuTextEn.Contains(input.Search) || input.Search.IsNullOrEmpty())))
                    .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
             var Questions = ObjectMapper.Map<List<InternalAuditMenuQuestion>, List<InternalAuditMenuQuestionDto>>(ListQuestions);
             var ListQuestion = InternalAuditMenuQuestionRepository.ToList();
                totalCount = ListQuestion.Count;
           
            if (!string.IsNullOrEmpty(input.Sorting))
            {
                var propertyInfo = typeof(InternalAuditMenuQuestionDto).GetProperty(input.Sorting);
                Questions.OrderBy(p => propertyInfo.GetValue(p, null));
            }
            return new PagedResultDto<InternalAuditMenuQuestionDto>(
                totalCount,
                Questions
            );
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<InternalAuditQuestionDto>> GetListQuestionByIdAsync(InternalAuditQuestionListPagedAndSortedResultRequestDto input)
        {
            int totalCount = 0;
            var ListQuestions =_internalAuditQuestionListRepository.Where(x =>x.Id==input.InternalAuditMenuQuestionId).ToList();
            var Questions = new List<InternalAuditQuestionDto>();
            foreach (var item in ListQuestions)
            {
                var Question = _InternalAuditQuestionRepository.Where(t=>t.Id== item.InternalAuditQuestionId).FirstOrDefault();
               Questions.Add(ObjectMapper.Map<InternalAuditQuestion,InternalAuditQuestionDto>(Question));
            }
            
            var ListQuestion = _internalAuditQuestionListRepository.Where(x => x.Id == input.InternalAuditMenuQuestionId).ToList();
            totalCount = ListQuestion.Count;

            if (!string.IsNullOrEmpty(input.Sorting))
            {
                var propertyInfo = typeof(InternalAuditMenuQuestionDto).GetProperty(input.Sorting);
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
