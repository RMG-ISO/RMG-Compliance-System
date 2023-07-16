using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using RMG.ComplianceSystem.EmailTemplates;
using RMG.ComplianceSystem.Employees;
using RMG.ComplianceSystem.Localization;
using RMG.ComplianceSystem.InternalAuditPreparations;
using RMG.ComplianceSystem.Shared;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Entities.Events;
using Volo.Abp.EventBus;
using Volo.Abp.Guids;
using Volo.Abp.Identity;
using Volo.Abp.Timing;
using Volo.Abp.Users;

namespace RMG.ComplianceSystem.Notifications
{
    public class InternalAuditPreparationHandler : ILocalEventHandler<EntityCreatedEventData<InternalAuditPreparations.InternalAuditPreparation>>, ILocalEventHandler<EntityUpdatedEventData<InternalAuditPreparations.InternalAuditPreparation>>, ITransientDependency
    {
        private readonly CurrentUser _currentUser;
        private readonly IGuidGenerator _guidGenerator;
        private readonly INotificationRepository _notificationsRepository;
        private readonly IClock _clock;
        private readonly IStringLocalizer<ComplianceSystemResource> _localizer;
        private readonly IInternalAuditPreparationRepository _InternalAuditPreparationRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IIdentityUserRepository _identityUserRepository;
        private readonly IEmailTemplateAppService _emailTemplateAppService;
        private readonly IEmailTemplateRepository _emailTemplatesRepository;
        private readonly INotificationAppService _notificationAppService;
        private readonly IInternalAuditorRepository _internalAuditorRepository;

        public InternalAuditPreparationHandler(CurrentUser currentUser, IGuidGenerator guidGenerator, INotificationRepository notificationsRepository, IClock clock,
            IStringLocalizer<ComplianceSystemResource> localizer, IInternalAuditPreparationRepository InternalAuditPreparationRepository,
            IEmployeeRepository employeeRepository, IIdentityUserRepository identityUserRepository,
            IEmailTemplateAppService emailTemplateAppService,
            IEmailTemplateRepository emailTemplatesRepository,
            INotificationAppService notificationAppService, IInternalAuditorRepository InternalAuditorRepository)
        {
            _currentUser = currentUser;
            _guidGenerator = guidGenerator;
            _notificationsRepository = notificationsRepository;
            _clock = clock;
            _localizer = localizer;
            _InternalAuditPreparationRepository = InternalAuditPreparationRepository;
            _employeeRepository = employeeRepository;
            _identityUserRepository = identityUserRepository;
            _emailTemplateAppService = emailTemplateAppService;
            _emailTemplatesRepository = emailTemplatesRepository;
            _notificationAppService = notificationAppService;
            _internalAuditorRepository= InternalAuditorRepository;
    }

        /// <summary>
        /// this event to insert data in notification on create
        /// </summary>
        /// <param name="eventData"></param>
        /// <returns></returns>
        public async Task HandleEventAsync(EntityCreatedEventData<InternalAuditPreparations.InternalAuditPreparation> eventData)
        {
            //Insert new record into notification table
            List<Notification> notificationList = new List<Notification>();

            List<string> _managerIds = new List<string>();
            List<string> _managerEmails = new List<string>();
            var useres = _identityUserRepository.GetListAsync().Result.Where(e => e.Id == eventData.Entity.ApproveBy).ToList();
            
            var auditors= _internalAuditorRepository.GetListAsync().Result.Where(t => t.InternalAuditPreparationId == eventData.Entity.Id).ToList();
            foreach (var item in auditors)
            {
                var auditor= _identityUserRepository.GetListAsync().Result.Where(e => e.Id == item.UserId).FirstOrDefault();
                if (auditor != null)
                    useres.Add(auditor);
            }
            
            if (useres != null && useres.Count() > 0)
            {
                _managerEmails = useres.Select(b => b.Email).ToList();
            }
            _managerEmails.Add(_currentUser.Email);

            string mailTo = null;
            if (_managerEmails.Count() == 1)
            {
                mailTo = _managerEmails[0];
            }
            else
            {
                mailTo = string.Join(',', _managerEmails);

            }
            /////////////////////
            if (useres != null && useres.Count() > 0)
            {
                _managerIds = useres.Select(b => b.Id.ToString()).ToList();
            }

          

            var emailTemplate = await _emailTemplatesRepository.GetAsync(x => x.Key == "InternalAuditPreparationNewTemplate");

            InternalAuditPreparationCreatedHandlerDto InternalAuditPreparationCreatedModel = new InternalAuditPreparationCreatedHandlerDto
            {
                AuditCode = eventData.Entity.AuditCode,
                AuditTitleEn = eventData.Entity.AuditTitleEn,
                AuditTitleAr = eventData.Entity.AuditTitleAr,
                StartDate = eventData.Entity.StartDate,
                EndDate = eventData.Entity.EndDate
            };

            var expandoData = Shared.Utility.ConvertTypeToExpandoObject(InternalAuditPreparationCreatedModel);
            var emailTemplateData = await _emailTemplateAppService.RenderTemplate("InternalAuditPreparationNewTemplate", expandoData);

            var notification = new Notification(
                _guidGenerator.Create(),
                "Compliance",
                null,
                mailTo,
                null,
                null,
                emailTemplate.Subject,
                Priority.Normal,
                NotificationType.Email, Status.Created,
                _clock.Now,
                emailTemplateData.Body,
                true,
                true,
                null,
                Utility.GetURL(NotificationSource.InternalAuditPreparation, eventData.Entity.Id, null, null),
                 NotySource.InternalAuditPreparation,
                eventData.Entity.Id,
                false
                );
            notificationList.Add(notification);

            //Push Notification
            InternalAuditPreparationNotificationDto InternalAuditPreparationNotificationDto = new InternalAuditPreparationNotificationDto
            {
                AuditCode = eventData.Entity.AuditCode,
                AuditTitleEn = eventData.Entity.AuditTitleEn,
                AuditTitleAr = eventData.Entity.AuditTitleAr,
                StartDate = eventData.Entity.StartDate,
                EndDate = eventData.Entity.EndDate
            };
            var expandoDataNotification = Shared.Utility.ConvertTypeToExpandoObject(InternalAuditPreparationNotificationDto);
            var NotificationTemplateData = await _emailTemplateAppService.RenderTemplateNotification("InternalAuditPreparationNewTemplate", expandoDataNotification);
            foreach (var item in _managerIds)
            {
                var PushNotification = new Notification(
                _guidGenerator.Create(),
                "ComplianceSystem",
                null,
                item,
                null,
                null,
                emailTemplate.Subject,
                Priority.Normal,
                NotificationType.Push,
                Status.NotSeen,
                _clock.Now,
                NotificationTemplateData.NotificationBody,
                true,
                true,
                null,
                Utility.GetURL(NotificationSource.InternalAuditPreparation, eventData.Entity.Id, null, null),
                 NotySource.InternalAuditPreparation,
                eventData.Entity.Id,
                false
                );
                notificationList.Add(PushNotification);
            }
            await _notificationsRepository.InsertManyAsync(notificationList, true);
            foreach (var notificatio in notificationList.Where(t => t.Type == NotificationType.Push))
            {

                await _notificationAppService.NotifyUser(Guid.Parse(notificatio.To));

                await _notificationAppService.SendNotifications();
            }
        }

        /// <summary>
        /// this event to insert data in notification on update
        /// </summary>
        /// <param name="eventData"></param>
        /// <returns></returns>
        public async Task HandleEventAsync(EntityUpdatedEventData<InternalAuditPreparations.InternalAuditPreparation> eventData)
        {
            List<Notification> notificationList = new List<Notification>();
            var emailTemplate = await _emailTemplatesRepository.GetAsync(x => x.Key == "InternalAuditPreparationCreated");
            var existingInternalAuditPreparation = await _InternalAuditPreparationRepository.GetAsync(eventData.Entity.Id);
            List<string> _managerIds = new List<string>();
            List<string> _managerEmails = new List<string>();

            var useres = _identityUserRepository.GetListAsync().Result.Where(e => e.Id == eventData.Entity.ApproveBy).ToList();

            var auditors = _internalAuditorRepository.GetListAsync().Result.Where(t => t.InternalAuditPreparationId == eventData.Entity.Id).ToList();
            foreach (var item in auditors)
            {
                var auditor = _identityUserRepository.GetListAsync().Result.Where(e => e.Id == item.UserId).FirstOrDefault();
                if (auditor != null)
                    useres.Add(auditor);
            }
            


            if (useres != null && useres.Count() > 0)
            {
                _managerEmails = useres.Select(b => b.Email).ToList();
            }
            _managerEmails.Add(_currentUser.Email);

            string mailTo = null;
            if (_managerEmails.Count() == 1)
            {
                mailTo = _managerEmails[0];
            }
            else
            {
                mailTo = string.Join(',', _managerEmails);

            }
            ////////////
           if (useres != null && useres.Count() > 0)
            {
                _managerIds = useres.Select(b => b.Id.ToString()).ToList();
            }

          


            InternalAuditPreparationCreatedHandlerDto InternalAuditPreparationCreatedModel = new InternalAuditPreparationCreatedHandlerDto
            {

                AuditCode = eventData.Entity.AuditCode,
                AuditTitleEn = eventData.Entity.AuditTitleEn,
                AuditTitleAr = eventData.Entity.AuditTitleAr,
                StartDate = eventData.Entity.StartDate,
                EndDate = eventData.Entity.EndDate
            };

            var expandoData = Shared.Utility.ConvertTypeToExpandoObject(InternalAuditPreparationCreatedModel);
            var emailTemplateData = await _emailTemplateAppService.RenderTemplate("InternalAuditPreparationCreated", expandoData);

            var notification = new Notification(_guidGenerator.Create(),
                "ComplianceSystem",
                null,
                mailTo,
                null,
                null,

            emailTemplate.Subject,
            Priority.Normal,
            NotificationType.Email, Status.Created,
            _clock.Now,
            emailTemplateData.Body,
            true,
            true,
            null,
            Utility.GetURL(NotificationSource.InternalAuditPreparation, eventData.Entity.Id, null, null),
             NotySource.InternalAuditPreparation,
            eventData.Entity.Id,
                false
                );
            notificationList.Add(notification);

            //Push Notification
            InternalAuditPreparationNotificationDto InternalAuditPreparationNotificationDto = new InternalAuditPreparationNotificationDto
            {
                AuditCode = eventData.Entity.AuditCode,
                AuditTitleEn = eventData.Entity.AuditTitleEn,
                AuditTitleAr = eventData.Entity.AuditTitleAr,
                StartDate = eventData.Entity.StartDate,
                EndDate = eventData.Entity.EndDate
            };
            var expandoDataNotification = Shared.Utility.ConvertTypeToExpandoObject(InternalAuditPreparationNotificationDto);
            var NotificationTemplateData = await _emailTemplateAppService.RenderTemplateNotification("InternalAuditPreparationCreated", expandoDataNotification);
            foreach (var item in _managerIds)
            {

            var PushNotification = new Notification(
                _guidGenerator.Create(),
                "ComplianceSystem",
                null,
                item,
                null,
                null,

            emailTemplate.Subject,
            Priority.Normal,
            NotificationType.Push,
            Status.NotSeen,
            _clock.Now,
            NotificationTemplateData.NotificationBody,
            true,
            true,
            null,
            Utility.GetURL(NotificationSource.InternalAuditPreparation, eventData.Entity.Id, null, null),
             NotySource.InternalAuditPreparation,
            eventData.Entity.Id,
            false
                );
            notificationList.Add(PushNotification);

            }
            await _notificationsRepository.InsertManyAsync(notificationList, true);
            foreach (var notificatio in notificationList.Where(t => t.Type == NotificationType.Push))
            {
                await _notificationAppService.NotifyUser(Guid.Parse(notificatio.To));
                await _notificationAppService.SendNotifications();

            }
        }
    }
}
