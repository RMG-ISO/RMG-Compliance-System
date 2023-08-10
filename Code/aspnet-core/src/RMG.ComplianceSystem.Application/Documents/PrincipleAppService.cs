using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Attachments.Dtos;
using RMG.ComplianceSystem.Documents.Dtos;
using RMG.ComplianceSystem.Permissions;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;
using RMG.ComplianceSystem.Attachments;
using Volo.Abp;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.Data;
using RMG.ComplianceSystem.Controls;
using Volo.Abp.Domain.Entities;
using RMG.ComplianceSystem.EmailTemplates;
using RMG.ComplianceSystem.Notifications;
using RMG.ComplianceSystem.Shared;
using RMG.ComplianceSystem.Employees;

namespace RMG.ComplianceSystem.Documents
{
    [Authorize]
    public class PrincipleAppService :
        CrudAppService<
            Principle, //The Principle entity
            PrincipleDto, //Used to show Principles
            Guid, //Primary key of the Principle entity
            PrincipleGetListInputDto, //Used for paging/sorting
            CreateUpdatePrincipleDto>, //Used to create/update a Principle
        IPrincipleAppService //implement the IPrincipleAppService
    {
        #region Permissions
        //protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.Principle.Default;
        //protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.Principle.Default;
        //protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.Principle.Create;
        //protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.Principle.Update;
        //protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.Principle.Delete;
        //protected  string DownLoadPolicyName { get; set; } = ComplianceSystemPermissions.Principle.DownLoad;
        #endregion

        private readonly IdentityUserManager User;
        private readonly IRepository<PrincipleControl, Guid> _principleControlRepository;
        private readonly IAttachmentRepository _attachmentRepository;
        private readonly IDocumentRepository _documentRepository;
        private readonly IControlRepository _controlRepository;
        private readonly IDataFilter _dataFilter;
        private readonly IEmailTemplateRepository _emailTemplateRepository;
        private readonly IEmailTemplateAppService _emailTemplateAppService;
        private readonly INotificationRepository _notificationRepository;
        private readonly INotificationAppService _notificationAppService;
        private readonly IEmployeeRepository _employeeRepository;

        public PrincipleAppService(
            IdentityUserManager _User, 
            IAttachmentRepository attachmentRepository, 
            IRepository<Principle, Guid> repository,
            IRepository<PrincipleControl, Guid> principleControlRepository,
            IDataFilter dataFilter,
            IControlRepository controlRepository,
            IDocumentRepository documentRepository,
            IEmployeeRepository employeeRepository,
            IEmailTemplateRepository emailTemplateRepository,
            IEmailTemplateAppService emailTemplateAppService,
            INotificationRepository notificationRepository,
            INotificationAppService notificationAppService
            ) : base(repository)
        {
            User = _User;
            _employeeRepository = employeeRepository;
            _dataFilter = dataFilter;
            _attachmentRepository = attachmentRepository;
            _documentRepository = documentRepository;
            _principleControlRepository = principleControlRepository;
            _controlRepository = controlRepository;
            _emailTemplateRepository = emailTemplateRepository;
            _emailTemplateAppService = emailTemplateAppService;
            _notificationRepository = notificationRepository;
            _notificationAppService = notificationAppService;
        }

        public override async Task<PrincipleDto> CreateAsync(CreateUpdatePrincipleDto input)
        {
            await CheckCreatePolicyAsync();
            await ValidateCreateUpdateAsync(input);
            var entity = await MapToEntityAsync(input);
            MapControls(entity, input.Controls);
            using (_dataFilter.Disable<ISoftDelete>())
            {
                entity.Reference = $"BSP-{(await Repository.CountAsync()) + 1}";
            }
            await Repository.InsertAsync(entity, true);
            return await MapToGetOutputDtoAsync(entity);
        }


        public override async Task<PrincipleDto> UpdateAsync(Guid id, CreateUpdatePrincipleDto input)
        {
            await ValidateCreateUpdateAsync(input);
            var entity = await Repository.GetAsync(id, false);
            await MapToEntityAsync(input, entity);
            await _principleControlRepository.DeleteAsync(x => x.PrincipleId == id);
            MapControls(entity, input.Controls);
            await Repository.UpdateAsync(entity, true);
            return await MapToGetOutputDtoAsync(entity);
        }

        [HttpPut]
        public async Task<PrincipleDto> UpdateCompliance(UpdatePrincipleComplianceDto input)
        {
            var principle = await Repository.GetAsync(input.PrincipleId);
            var document = await _documentRepository.GetAsync(principle.DocumentId);
            if (!document.ComplianceScheduledStartDate.HasValue
                || (document.ComplianceScheduledStartDate.HasValue && document.ComplianceScheduledStartDate.Value > Clock.Now.Date))
                throw new BusinessException(ComplianceSystemDomainErrorCodes.CannotStartPrincipleComplianceYet);

            principle.ComplianceStatus = input.Status;
            principle.ComplianceComment = input.Comment;
            principle.AttachmentId = input.AttachmentId;
            switch (input.Status)
            {
                case PrincipleStatus.NotApplicable:
                    principle.ComplianceScore = 0;
                    break;
                case PrincipleStatus.NotComply:
                    principle.ComplianceScore = 0;
                    break;
                case PrincipleStatus.PartiallyComply:
                    principle.ComplianceScore = input.Score;
                    break;
                case PrincipleStatus.Comply:
                    principle.ComplianceScore = 100;
                    break;
                default:
                    break;
            }

            await Repository.UpdateAsync(principle, true);

            //await NotifyUsersAsync(nameof(NotificationSource.PrincipleComplianceStarted), document.Owners.Select(o => o.EmployeeId).ToList(), NotificationSource.PrincipleComplianceStarted, NotySource.PrincipleComplianceStarted, principle);
            return await MapToGetOutputDtoAsync(principle);
        }

        protected override async Task<IQueryable<Principle>> CreateFilteredQueryAsync(PrincipleGetListInputDto input)
        {
            var query = await Repository.WithDetailsAsync();
            query = query.WhereIf(input.DocumentId.HasValue, x => x.DocumentId ==  input.DocumentId);
            return query;
        }

        private void MapControls(Principle entity, List<Guid> controls)
        {
            foreach (var item in controls)
            {
                entity.PrincipleControls.Add(new PrincipleControl(GuidGenerator.Create(), item));
            }
        }

        private async Task ValidateCreateUpdateAsync(CreateUpdatePrincipleDto input)
        {
            await _documentRepository.EnsureExistsAsync(input.DocumentId);
            foreach (var item in input.Controls)
            {
                await _controlRepository.GetAsync(item, false);
            }
        }


        //private async Task NotifyUsersAsync(string emailTemplateKey, List<Guid> receiversIds, NotificationSource notificationSource, NotySource notySource, Principle principle)
        //{
        //    List<Notification> notificationList = new List<Notification>();

        //    var emailTemplate = await _emailTemplateRepository.GetAsync(x => x.Key == emailTemplateKey);
        //    var employees = (await _employeeRepository.GetQueryableAsync()).Where(e => receiversIds.Contains(e.Id)).ToList();
        //    foreach (var receiverId in receiversIds)
        //    {
        //        var Receiver = employees.FirstOrDefault(x => x.Id == receiverId);
        //        //Email Notification

        //        object emailTemplateModel = null;
        //        switch (notificationSource)
        //        {
        //            case NotificationSource.PrincipleComplianceStarted:
        //                emailTemplateModel = new PrincipleComplianceDataFilledEmailDto
        //                {
        //                    ReceiverName = Receiver.FullName,
        //                    PrincipleName = principle.Name,
        //                    URL = Utility.GetURL(notificationSource, principle.Id, null, null)
        //                };
        //                break;
        //            default:
        //                emailTemplateModel = new
        //                {

        //                };
        //                break;
        //        }

        //        var expandoData = Utility.ConvertTypeToExpandoObject(emailTemplateModel);
        //        var emailTemplateData = await _emailTemplateAppService.RenderTemplate(emailTemplateKey, expandoData);

        //        var notification = new Notification(
        //            GuidGenerator.Create(),
        //            "Compliance System",
        //            null,
        //            Receiver.Email,
        //            null,
        //            null,
        //            emailTemplate.Subject,
        //            Priority.Normal,
        //            NotificationType.Email,
        //            Notifications.Status.Created,
        //            Clock.Now,
        //            emailTemplateData.Body,
        //            true,
        //            true,
        //            null,
        //            null,
        //            null,
        //            null,
        //            false
        //        );
        //        notificationList.Add(notification);

        //        //Push Notification

        //        var PushNotification = new Notification(
        //            Guid.NewGuid(),
        //            "ComplianceSystem",
        //            null,
        //            Receiver.Id.ToString(),
        //            null,
        //            null,
        //            emailTemplate.Subject,
        //            Priority.Normal,
        //            NotificationType.Push,
        //            Notifications.Status.NotSeen,
        //            Clock.Now,
        //            emailTemplate.NotificationBody,
        //            true,
        //            true,
        //            null,
        //            Utility.GetURL(notificationSource, principle.Id, null, null),
        //            notySource,
        //            null,
        //            false
        //        );
        //        notificationList.Add(PushNotification);
        //    }

        //    await _notificationRepository.InsertManyAsync(notificationList, true);
        //    foreach (var not in notificationList.Where(t => t.Type == NotificationType.Push))
        //    {
        //        await _notificationAppService.NotifyUser(Guid.Parse(not.To));

        //    }
        //}


    }
}
