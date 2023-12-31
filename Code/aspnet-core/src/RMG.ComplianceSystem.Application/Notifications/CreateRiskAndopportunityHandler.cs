using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using RMG.ComplianceSystem.EmailTemplates;
using RMG.ComplianceSystem.Employees;
using RMG.ComplianceSystem.Localization;
using RMG.ComplianceSystem.Risks.Entity;
using RMG.ComplianceSystem.Risks.IRepository;
using RMG.ComplianceSystem.RiskTreatments;
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
    public class CreateRiskOpportunityHandler : ILocalEventHandler<EntityCreatedEventData<RiskOpportunity>>, ILocalEventHandler<EntityUpdatedEventData<RiskOpportunity>>, ITransientDependency
    {
        private readonly CurrentUser _currentUser;
        private readonly IGuidGenerator _guidGenerator;
        private readonly INotificationRepository _notificationsRepository;
        private readonly IClock _clock;
        private readonly IStringLocalizer<ComplianceSystemResource> _localizer;

        private readonly IRiskAndOpportunityRepository _riskAndOpportunityRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IIdentityUserRepository _identityUserRepository;
        private readonly IEmailTemplateAppService _emailTemplateAppService;
        private readonly IEmailTemplateRepository _emailTemplatesRepository;
        private readonly INotificationAppService _notificationAppService;

        public CreateRiskOpportunityHandler(CurrentUser currentUser, IGuidGenerator guidGenerator, INotificationRepository notificationsRepository, IClock clock,
            IStringLocalizer<ComplianceSystemResource> localizer,
            IEmployeeRepository employeeRepository, IIdentityUserRepository identityUserRepository,
            IEmailTemplateAppService emailTemplateAppService,
            IEmailTemplateRepository emailTemplatesRepository,
            IRiskAndOpportunityRepository riskAndOpportunityRepository,
            INotificationAppService notificationAppService)
        {
            _currentUser = currentUser;
            _riskAndOpportunityRepository = riskAndOpportunityRepository;
            _guidGenerator = guidGenerator;
            _notificationsRepository = notificationsRepository;
            _clock = clock;
            _localizer = localizer;
            _employeeRepository = employeeRepository;
            _identityUserRepository = identityUserRepository;
            _emailTemplateAppService = emailTemplateAppService;
            _emailTemplatesRepository = emailTemplatesRepository;
            _notificationAppService = notificationAppService;
        }

        /// <summary>
        /// this event to insert data in notification on create
        /// </summary>
        /// <param name="eventData"></param>
        /// <returns></returns>
        public async Task HandleEventAsync(EntityCreatedEventData<RiskOpportunity> eventData)
        {
            //Insert new record into notification table
            List<Notification> notificationList = new List<Notification>();

            List<Guid> _managerIds = new List<Guid>();
            List<string> _managerEmails = new List<string>();
           
            
            var useres = _identityUserRepository.GetListAsync().Result.Where(e => e.Id==eventData.Entity.OwnerId).ToList();

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
           
            var emailTemplate = await _emailTemplatesRepository.GetAsync(x => x.Key == "RiskNewTemplate");

            RisksOpportunityCreatedHandlerDto RiskOpportunityCreatedModel = new RisksOpportunityCreatedHandlerDto
            {
                NameAr = eventData.Entity.NameAr,
                NameEn = eventData.Entity.NameEn
            };

            var expandoData = Shared.Utility.ConvertTypeToExpandoObject(RiskOpportunityCreatedModel);
            var emailTemplateData = await _emailTemplateAppService.RenderTemplate("RiskNewTemplate", expandoData);

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
                Utility.GetURL(NotificationSource.Risk, eventData.Entity.Id, null, null),
                 NotySource.Risk,
                eventData.Entity.Id,
                false
                );
            notificationList.Add(notification);

            //Push Notification
            RisksOpportunityNotificationDto RiskOpportunityNotificationDto = new RisksOpportunityNotificationDto
            {
                NameAr = eventData.Entity.NameAr,
                NameEn = eventData.Entity.NameEn
            };
            var expandoDataNotification = Shared.Utility.ConvertTypeToExpandoObject(RiskOpportunityNotificationDto);
            var NotificationTemplateData = await _emailTemplateAppService.RenderTemplateNotification("RiskNewTemplate", expandoDataNotification);

            var PushNotification = new Notification(
                _guidGenerator.Create(),
                "ComplianceSystem",
                null,
               eventData.Entity.OwnerId.ToString(),
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
                Utility.GetURL(NotificationSource.Risk, eventData.Entity.Id, null, null),
                 NotySource.Risk,
                eventData.Entity.Id,
                false
                );
            notificationList.Add(PushNotification);

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
        public async Task HandleEventAsync(EntityUpdatedEventData<RiskOpportunity> eventData)
        {
            List<Notification> notificationList = new List<Notification>();
            var emailTemplate = await _emailTemplatesRepository.GetAsync(x => x.Key == "RisksCreated");
            var existingRiskOpportunity = await _riskAndOpportunityRepository.GetAsync(eventData.Entity.Id);
            List<Guid> _managerIds = new List<Guid>();
            List<string> _managerEmails = new List<string>();


            var useres = _identityUserRepository.GetListAsync().Result.Where(e => e.Id == eventData.Entity.OwnerId).ToList();

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

            RisksOpportunityCreatedHandlerDto RiskOpportunityCreatedModel = new RisksOpportunityCreatedHandlerDto
                {

                    NameAr = eventData.Entity.NameAr,
                    NameEn = eventData.Entity.NameEn
                };

                var expandoData = Shared.Utility.ConvertTypeToExpandoObject(RiskOpportunityCreatedModel);
                var emailTemplateData = await _emailTemplateAppService.RenderTemplate("RisksCreated", expandoData);

                var notification = new Notification(_guidGenerator.Create(),
                    "ComplianceSystem", null,
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
                Utility.GetURL(NotificationSource.Risk, eventData.Entity.Id, null, null),
                 NotySource.Risk,
                eventData.Entity.Id,
                    false
                    );
                notificationList.Add(notification);

                //Push Notification
                RisksOpportunityNotificationDto RiskOpportunityNotificationDto = new RisksOpportunityNotificationDto
                {
                    NameAr = eventData.Entity.NameAr,
                    NameEn = eventData.Entity.NameEn
                };
                var expandoDataNotification = Shared.Utility.ConvertTypeToExpandoObject(RiskOpportunityNotificationDto);
                var NotificationTemplateData = await _emailTemplateAppService.RenderTemplateNotification("RisksCreated", expandoDataNotification);

                var PushNotification = new Notification(
                    _guidGenerator.Create(),
                    "ComplianceSystem",
                    null,
                   eventData.Entity.OwnerId.ToString(),
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
                Utility.GetURL(NotificationSource.Risk, eventData.Entity.Id, null, null),
                 NotySource.Risk,
                eventData.Entity.Id,
                false
                    );
                notificationList.Add(PushNotification);

                await _notificationsRepository.InsertManyAsync(notificationList, true);
                foreach (var notificatio in notificationList.Where(t => t.Type == NotificationType.Push))
                {
                    await _notificationAppService.NotifyUser(Guid.Parse(notificatio.To));
                await _notificationAppService.SendNotifications();

            }
            }
        }
    }
