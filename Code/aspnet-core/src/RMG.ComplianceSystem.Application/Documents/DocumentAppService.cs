using RMG.ComplianceSystem.Employees;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using RMG.ComplianceSystem.Documents.Dtos;
using RMG.ComplianceSystem.Shared;
using Volo.Abp.Data;
using AutoMapper.Internal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RMG.ComplianceSystem.Notifications;
using RMG.ComplianceSystem.Frameworks.Dtos;
using RMG.ComplianceSystem.EmailTemplates;

namespace RMG.ComplianceSystem.Documents
{
    [Authorize]
    public class DocumentAppService : CrudAppService<Document, DocumentDto, Guid, DocumentGetListInputDto, CreateDocumentDto>, IDocumentAppService
    {
        private readonly IDataFilter _dataFilter;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IRepository<Category, Guid> _categoryRepository;
        private readonly IRepository<DocumentCategory, Guid> _documentCategoryRepository;
        private readonly IRepository<DocumentApprover, Guid> _documentApproverRepository;
        private readonly IRepository<DocumentReviewer, Guid> _documentReviewerRepository;
        private readonly IRepository<DocumentOwner, Guid> _documentOwnerRepository;
        private readonly IRepository<DocumentActionLog, Guid> _actionLogRepository;
        private readonly IEmailTemplateRepository _emailTemplateRepository;
        private readonly IEmailTemplateAppService _emailTemplateAppService;
        private readonly INotificationRepository _notificationRepository;
        private readonly INotificationAppService _notificationAppService;

        public DocumentAppService(
            IDocumentRepository repository,
            IEmployeeRepository employeeRepository,
            IRepository<Category, Guid> categoryRepository,
            IRepository<DocumentCategory, Guid> documentCategoryRepository,
            IRepository<DocumentApprover, Guid> documentApproverRepository,
            IRepository<DocumentReviewer, Guid> documentReviewerRepository,
            IRepository<DocumentOwner, Guid> documentOwnerRepository,
            IRepository<DocumentActionLog, Guid> actionLogRepository,
            IEmailTemplateRepository emailTemplateRepository,
            IEmailTemplateAppService emailTemplateAppService,
            INotificationRepository notificationRepository,
            INotificationAppService notificationAppService,
            IDataFilter dataFilter
            ) : base(repository)
        {
            _dataFilter = dataFilter;
            _employeeRepository = employeeRepository;
            _categoryRepository = categoryRepository;
            _documentApproverRepository = documentApproverRepository;
            _documentOwnerRepository = documentOwnerRepository;
            _documentReviewerRepository = documentReviewerRepository;
            _documentCategoryRepository = documentCategoryRepository;
            _actionLogRepository = actionLogRepository;
            _emailTemplateRepository = emailTemplateRepository;
            _emailTemplateAppService = emailTemplateAppService;
            _notificationRepository = notificationRepository;
            _notificationAppService = notificationAppService;
        }

        public override async Task<DocumentDto> CreateAsync(CreateDocumentDto input)
        {
            await CheckCreatePolicyAsync();
            await ValidateCreateUpdate(input);
            var entity = await MapToEntityAsync(input);
            using (_dataFilter.Disable<ISoftDelete>())
            {
                entity.Code = "DOC-" + (await Repository.CountAsync()) + 1;
            }
            entity.Status = DocumentStatus.Draft;
            MapCategories(entity, input.CategoriesIds);
            MapOwners(entity, input.OwnersIds);
            MapReviewers(entity, input.RequiredReviewersIds, input.OptionalReviewersIds);
            MapApprovers(entity, input.RequiredApproversIds, input.OptionalApproversIds);

            await Repository.InsertAsync(entity, autoSave: true);
            return await MapToGetOutputDtoAsync(entity);
        }

        public override async Task<DocumentDto> UpdateAsync(Guid id, CreateDocumentDto input)
        {
            await CheckUpdatePolicyAsync();
            await ValidateCreateUpdate(input);
            var entity = await Repository.GetAsync(id);
            await MapToEntityAsync(input, entity);

            await _documentCategoryRepository.DeleteAsync(x => x.DocumentId == id);
            await _documentApproverRepository.DeleteAsync(x => x.DocumentId == id);
            await _documentOwnerRepository.DeleteAsync(x => x.DocumentId == id);
            await _documentReviewerRepository.DeleteAsync(x => x.DocumentId == id);
            MapCategories(entity, input.CategoriesIds);
            MapOwners(entity, input.OwnersIds);
            MapReviewers(entity, input.RequiredReviewersIds, input.OptionalReviewersIds);
            MapApprovers(entity, input.RequiredApproversIds, input.OptionalApproversIds);

            await Repository.UpdateAsync(entity, true);
            return await MapToGetOutputDtoAsync(entity);
        }

        public async Task<ListResultDto<NameId<Guid>>> GetAllCategories()
        {
            var categories = (await _categoryRepository.GetQueryableAsync()).ToList();

            return new ListResultDto<NameId<Guid>>(ObjectMapper.Map<List<Category>, List<NameId<Guid>>>(categories));
        }


        [HttpPut]
        public async Task SendForRevision(Guid id, TakeActionWithNotes input)
        {
            var entity = await Repository.GetAsync(id);
            entity.Status = DocumentStatus.UnderReview;
            await _actionLogRepository.InsertAsync(new DocumentActionLog(GuidGenerator.Create(), id, input.Notes, entity.Status, input.Role, ActionLogType.Approve));
            await NotifyUsersAsync(nameof(NotificationSource.DocumentSentForRevision), entity.Reviewers.Select(r => r.EmployeeId).ToList(), NotificationSource.DocumentSentForRevision, NotySource.DocumentSentForRevision, entity);
        }

        [HttpPut]
        public async Task ReturnToCreator(Guid id, TakeActionWithRequiredNotes input)
        {
            var entity = await Repository.GetAsync(id);
            await _actionLogRepository.InsertAsync(new DocumentActionLog(GuidGenerator.Create(), id, input.Notes, DocumentStatus.ReturnToCreator, input.Role, ActionLogType.ReturnToCreator));
            await NotifyUsersAsync(nameof(NotificationSource.DocumentReturnedToContributor), entity.Owners.Select(r => r.EmployeeId).ToList(), NotificationSource.DocumentReturnedToContributor, NotySource.DocumentReturnedToContributor, entity);

        }

        [HttpPut]
        public async Task SendForApproval(Guid id, TakeActionWithNotes input)
        {
            var entity = await Repository.GetAsync(id);
            entity.Status = DocumentStatus.Accepted;
            await _actionLogRepository.InsertAsync(new DocumentActionLog(GuidGenerator.Create(), id, input.Notes, entity.Status, input.Role, ActionLogType.Approve));
            await NotifyUsersAsync(nameof(NotificationSource.DocumentSentForApproval), entity.Approvers.Select(r => r.EmployeeId).ToList(), NotificationSource.DocumentSentForApproval, NotySource.DocumentSentForApproval, entity);
        }

        [HttpPut]
        public async Task Approve(Guid id, TakeActionWithNotes input)
        {
            var entity = await Repository.GetAsync(id);
            entity.Status = DocumentStatus.Approved;
            await _actionLogRepository.InsertAsync(new DocumentActionLog(GuidGenerator.Create(), id, input.Notes, entity.Status, input.Role, ActionLogType.Approve));
            await NotifyUsersAsync(nameof(NotificationSource.DocumentApproved), entity.Owners.Select(r => r.EmployeeId).ToList(), NotificationSource.DocumentApproved, NotySource.DocumentApproved, entity);
        }

        [HttpPut]
        public async Task FinishUserRevision(Guid id, TakeActionWithNotes input)
        {
            var entity = await Repository.GetAsync(id);
            await _actionLogRepository.InsertAsync(new DocumentActionLog(GuidGenerator.Create(), id, input.Notes, entity.Status, input.Role, ActionLogType.Finish));
            await NotifyUsersAsync(nameof(NotificationSource.DocumentReviewedByUser), entity.Owners.Select(r => r.EmployeeId).ToList(), NotificationSource.DocumentReviewedByUser, NotySource.DocumentReviewedByUser, entity, CurrentUser.Id);
        }

        [HttpPut]
        public async Task FinishUserApproval(Guid id, TakeActionWithNotes input)
        {
            var entity = await Repository.GetAsync(id);
            await _actionLogRepository.InsertAsync(new DocumentActionLog(GuidGenerator.Create(), id, input.Notes, entity.Status, input.Role, ActionLogType.Finish));
            await NotifyUsersAsync(nameof(NotificationSource.DocumentApprovedByUser), entity.Owners.Select(r => r.EmployeeId).ToList(), NotificationSource.DocumentApprovedByUser, NotySource.DocumentApprovedByUser, entity, CurrentUser.Id);
        }

        protected override async Task<DocumentDto> MapToGetOutputDtoAsync(Document entity)
        {
            var dto = await base.MapToGetOutputDtoAsync(entity);
            if (dto.CreatorId.HasValue)
                dto.CreatorName = (await _employeeRepository.GetAsync(dto.CreatorId.Value, false)).FullName;
            if (dto.LastModifierId.HasValue)
                dto.LastModifierName = (await _employeeRepository.GetAsync(dto.LastModifierId.Value, false)).FullName;

            foreach (var action in dto.ActionsLog)
            {
                if (action.CreatorId.HasValue)
                    action.CreatorName = (await _employeeRepository.GetAsync(action.CreatorId.Value, false)).FullName;
            }
            return dto;
        }

        protected override async Task<IQueryable<Document>> CreateFilteredQueryAsync(DocumentGetListInputDto input)
        {
            var query = await Repository.WithDetailsAsync();
            query = query.WhereIf(!input.Code.IsNullOrEmpty(), x => x.Code.Contains(input.Code))
                        .WhereIf(!input.Name.IsNullOrEmpty(), x => x.Name.Contains(input.Name));
            return query;
        }

        private async Task ValidateCreateUpdate(CreateDocumentDto input)
        {
            // employees check (reviewers , approvals , owners)
            var employeesIds = (await _employeeRepository.GetQueryableAsync()).Select(x => x.Id).ToList();
            if (!input.EmployeesIds.All(employeesIds.Contains))
                throw new UserFriendlyException(L["EmployeesNotExists"]);

            //category check
            var categoriesIds = (await _categoryRepository.GetQueryableAsync()).Select(x => x.Id).ToList();
            if (!input.CategoriesIds.All(categoriesIds.Contains))
                throw new UserFriendlyException(L["CategoryNotExists"]);

        }

        private void MapApprovers(Document document, IList<Guid> requiredApprovers, IList<Guid> optionalApprovers)
        {
            if (requiredApprovers != null)
                foreach (var item in requiredApprovers)
                {
                    document.Approvers.Add(new DocumentApprover(GuidGenerator.Create(), item, true));
                }

            if (optionalApprovers != null)
                foreach (var item in optionalApprovers)
                {
                    document.Approvers.Add(new DocumentApprover(GuidGenerator.Create(), item, false));
                }
        }

        private void MapReviewers(Document document, IList<Guid> requiredReviewers, IList<Guid> optionalReviewers)
        {
            if (requiredReviewers != null)
                foreach (var item in requiredReviewers)
                {
                    document.Reviewers.Add(new DocumentReviewer(GuidGenerator.Create(), item, true));
                }

            if (optionalReviewers != null)
                foreach (var item in optionalReviewers)
                {
                    document.Reviewers.Add(new DocumentReviewer(GuidGenerator.Create(), item, false));
                }
        }

        private void MapCategories(Document document, IList<Guid> categories)
        {
            if (categories != null)
                foreach (var item in categories)
                {
                    document.DocumentCategories.Add(new DocumentCategory(GuidGenerator.Create(), item));
                }
        }

        private void MapOwners(Document document, IList<Guid> owners)
        {
            if (owners != null)
                foreach (var item in owners)
                {
                    document.Owners.Add(new DocumentOwner(GuidGenerator.Create(), item));
                }
        }


        private async Task NotifyUsersAsync(string emailTemplateKey, List<Guid> receiversIds, NotificationSource notificationSource, NotySource notySource, Document document, Guid? actionById = null)
        { 
            List<Notification> notificationList = new List<Notification>();

            var emailTemplate = await _emailTemplateRepository.GetAsync(x => x.Key == emailTemplateKey);
            var employees = (await _employeeRepository.GetQueryableAsync()).Where(e => receiversIds.Contains(e.Id) || e.Id == actionById).ToList();
            foreach (var receiverId in receiversIds)
            {
                var Receiver = employees.FirstOrDefault(x => x.Id == receiverId);
                //Email Notification

                object emailTemplateModel = null;
                switch (notificationSource)
                {
                    case NotificationSource.DocumentSentForRevision or
                        NotificationSource.DocumentReturnedToContributor or
                        NotificationSource.DocumentSentForApproval or
                        NotificationSource.DocumentApproved:
                        emailTemplateModel = new DocumentStepAHeadWorkflowEmailDto
                        {
                            ReceiverName = Receiver.FullName,
                            DocumentName = document.Name,
                            URL = Utility.GetURL(notificationSource, document.Id, null, null)
                        };
                        break;
                    case NotificationSource.DocumentReviewedByUser or
                        NotificationSource.DocumentApprovedByUser:
                        {
                            emailTemplateModel = new DocumentWorkflowActionByUserEmailDto
                            {
                                ReceiverName = Receiver.FullName,
                                DocumentName = document.Name,
                                URL = Utility.GetURL(notificationSource, document.Id, null, null),
                                ActionByName = employees.FirstOrDefault(e => e.Id == actionById)?.FullName
                            };
                            break;
                        }
                    default:
                        emailTemplateModel = new
                        {

                        };
                        break;
                }

                var expandoData = Utility.ConvertTypeToExpandoObject(emailTemplateModel);
                var emailTemplateData = await _emailTemplateAppService.RenderTemplate(emailTemplateKey, expandoData);

                var notification = new Notification(
                    GuidGenerator.Create(),
                    "Compliance System",
                    null,
                    Receiver.Email,
                    null,
                    null,
                    emailTemplate.Subject,
                    Priority.Normal,
                    NotificationType.Email,
                    Notifications.Status.Created,
                    Clock.Now,
                    emailTemplateData.Body,
                    true,
                    true,
                    null,
                    null,
                    null,
                    null,
                    false
                );
                notificationList.Add(notification);

                //Push Notification

                var PushNotification = new Notification(
                    Guid.NewGuid(),
                    "ComplianceSystem",
                    null,
                    Receiver.Id.ToString(),
                    null,
                    null,
                    emailTemplate.Subject,
                    Priority.Normal,
                    NotificationType.Push,
                    Notifications.Status.NotSeen,
                    Clock.Now,
                    emailTemplate.NotificationBody,
                    true,
                    true,
                    null,
                    Utility.GetURL(notificationSource, document.Id, null, null),
                    notySource,
                    null,
                    false
                );
                notificationList.Add(PushNotification);
            }

            await _notificationRepository.InsertManyAsync(notificationList, true);
            foreach (var not in notificationList.Where(t => t.Type == NotificationType.Push))
            {
                await _notificationAppService.NotifyUser(Guid.Parse(not.To));

            }
        }


    }
}
