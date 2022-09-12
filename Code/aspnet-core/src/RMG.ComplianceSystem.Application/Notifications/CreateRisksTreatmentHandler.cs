using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using RMG.ComplianceSystem.EmailTemplates;
using RMG.ComplianceSystem.Employees;
using RMG.ComplianceSystem.Localization;
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
    public class CreateRisksTreatmentHandler : ILocalEventHandler<EntityCreatedEventData<RisksTreatment>>, ILocalEventHandler<EntityUpdatedEventData<RisksTreatment>>, ITransientDependency
    {
        private readonly CurrentUser _currentUser;
        private readonly IGuidGenerator _guidGenerator;
        private readonly INotificationRepository _notificationsRepository;
        private readonly IClock _clock;
        private readonly IStringLocalizer<ComplianceSystemResource> _localizer;
        private readonly IRiskTreatmentRepository _RisksTreatmentRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IIdentityUserRepository _identityUserRepository;
        private readonly IEmailTemplateAppService _emailTemplateAppService;
        private readonly IEmailTemplateRepository _emailTemplatesRepository;
        private readonly INotificationAppService _notificationAppService;

        public CreateRisksTreatmentHandler(CurrentUser currentUser, IGuidGenerator guidGenerator, INotificationRepository notificationsRepository, IClock clock,
            IStringLocalizer<ComplianceSystemResource> localizer, IRiskTreatmentRepository RisksTreatmentRepository,
            IEmployeeRepository employeeRepository, IIdentityUserRepository identityUserRepository,
            IEmailTemplateAppService emailTemplateAppService,
            IEmailTemplateRepository emailTemplatesRepository,
            INotificationAppService notificationAppService)
        {
            _currentUser = currentUser;
            _guidGenerator = guidGenerator;
            _notificationsRepository = notificationsRepository;
            _clock = clock;
            _localizer = localizer;
            _RisksTreatmentRepository = RisksTreatmentRepository;
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
        public async Task HandleEventAsync(EntityCreatedEventData<RisksTreatment> eventData)
        {
            //Insert new record into notification table
            List<Notification> notificationList = new List<Notification>();

            //email template
            List<Guid> _departments = new List<Guid>();
            List<Guid> _managerIds = new List<Guid>();
            List<string> _managerEmails = new List<string>();
            //_departments = eventData.Entity.Departments.Select(c => c.Id).ToList();
            //if (eventData.Entity. != Guid.Empty)
            //{
            //    _departments.Add(eventData.Entity.MainDepartmentId.Value);
            //}
            //if (eventData.Entity.SubDepartmentId != null && eventData.Entity.SubDepartmentId != Guid.Empty)
            //{
            //    _departments.Add(eventData.Entity.SubDepartmentId.Value);
            //}

            //_managerIds = _employeeRepository.GetListAsync()
            //                .Result.
            //                Where(x => x.IsManager == true
            //                && _departments.Contains(x.DepartmentId.Value))
            //                .Select(b => b.Id).ToList();

            var useres = _identityUserRepository.GetListAsync().Result.Where(e => _managerIds.Contains(e.Id)).ToList();

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

            var emailTemplate = await _emailTemplatesRepository.GetAsync(x => x.Key == "RisksTreatmentNewTemplates");


            string Departments = "";
            //foreach (var dept in eventData.Entity.Departments)
            //{
            //    Departments += "<li>" + dept.Name + "</li>";
            //}
            //if (eventData.Entity.MainDepartment != null)
            //{
            //    Departments += "<li>" + eventData.Entity.MainDepartment.Name + "</li>";
            //}
            //if (eventData.Entity.SubDepartment != null)
            //{
            //    Departments += "<li>" + eventData.Entity.SubDepartment.Name + "</li>";
            //}
            RisksTreatmentCreatedHandlerDto RisksTreatmentCreatedModel = new RisksTreatmentCreatedHandlerDto
            {
                MitigateActionPlanAr = eventData.Entity.MitigateActionPlanAr,
                MitigateActionPlanEn = eventData.Entity.MitigateActionPlanEn,
                ActionDetailsAr = eventData.Entity.ActionDetailsAr,
                ActionDetailsEn = eventData.Entity.ActionDetailsEn,
                DueDate = eventData.Entity.DueDate.Value.ToString("yyyy/MM/dd"),
                AchievementPercentage = eventData.Entity.AchievementPercentage.ToString()
            };

            var expandoData = Shared.Utility.ConvertTypeToExpandoObject(RisksTreatmentCreatedModel);
            var emailTemplateData = await _emailTemplateAppService.RenderTemplate("RisksTreatmentNewTemplates", expandoData);

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
                null,
                null,
                null,
                false
                );
            notificationList.Add(notification);

            //Push Notification
            RisksTreatmentNotificationDto RisksTreatmentNotificationDto = new RisksTreatmentNotificationDto
            {
                MitigateActionPlanAr = eventData.Entity.MitigateActionPlanAr,
                ActionDetailsAr = eventData.Entity.ActionDetailsAr,
                DueDate = eventData.Entity.DueDate.Value.ToString("yyyy/MM/dd")
            };
            var expandoDataNotification = Shared.Utility.ConvertTypeToExpandoObject(RisksTreatmentNotificationDto);
            var NotificationTemplateData = await _emailTemplateAppService.RenderTemplateNotification("RisksTreatmentNewTemplates", expandoDataNotification);

            var PushNotification = new Notification(
                _guidGenerator.Create(),
                "ComplianceSystem",
                null,
                _currentUser.Id.ToString(),
                null,
                null,
                emailTemplate.Subject,
                Priority.Normal,
                NotificationType.Push,
                Notifications.Status.NotSeen,
                _clock.Now,
                NotificationTemplateData.NotificationBody,
                true,
                true,
                null,
                Utility.GetURL(NotificationSource.RiskTreatment, eventData.Entity.Id, null, null),
                 NotySource.RiskTreatment,
                eventData.Entity.Id,
                false
                );
            notificationList.Add(PushNotification);

            await _notificationsRepository.InsertManyAsync(notificationList, true);
            foreach (var notificatio in notificationList.Where(t => t.Type == NotificationType.Push))
            {
                await _notificationAppService.NotifyUser(Guid.Parse(notificatio.To));

            }
        }

        /// <summary>
        /// this event to insert data in notification on update
        /// </summary>
        /// <param name="eventData"></param>
        /// <returns></returns>
        public async Task HandleEventAsync(EntityUpdatedEventData<RisksTreatment> eventData)
        {
            List<Notification> notificationList = new List<Notification>();
            var emailTemplate = await _emailTemplatesRepository.GetAsync(x => x.Key == "RisksTreatment");
            var existingRisksTreatment = await _RisksTreatmentRepository.GetAsync(eventData.Entity.Id);

            if (existingRisksTreatment.Responsibility !=null)//User has changed revision date, so insert a new record into notification table
            {

                

                }
              
                RisksTreatmentCreatedHandlerDto RisksTreatmentCreatedModel = new RisksTreatmentCreatedHandlerDto
                {

                    MitigateActionPlanAr = eventData.Entity.MitigateActionPlanAr,
                    MitigateActionPlanEn = eventData.Entity.MitigateActionPlanEn,
                    ActionDetailsAr = eventData.Entity.ActionDetailsAr,
                    ActionDetailsEn = eventData.Entity.ActionDetailsEn,
                    DueDate = eventData.Entity.DueDate.Value.ToString("yyyy/MM/dd"),
                    AchievementPercentage = eventData.Entity.AchievementPercentage.ToString()
                };

                var expandoData = Shared.Utility.ConvertTypeToExpandoObject(RisksTreatmentCreatedModel);
                var emailTemplateData = await _emailTemplateAppService.RenderTemplate("RisksTreatment", expandoData);

                var notification = new Notification(_guidGenerator.Create(),
                    "ComplianceSystem", null,
                    _currentUser.Email,
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
                    null,
                    null,
                    null,
                    false
                    );
                notificationList.Add(notification);

                //Push Notification
                RisksTreatmentNotificationDto RisksTreatmentNotificationDto = new RisksTreatmentNotificationDto
                {
                    MitigateActionPlanAr = eventData.Entity.MitigateActionPlanAr,
                    ActionDetailsAr = eventData.Entity.ActionDetailsAr,
                    DueDate = eventData.Entity.DueDate.Value.ToString("yyyy/MM/dd"),
                };
                var expandoDataNotification = Shared.Utility.ConvertTypeToExpandoObject(RisksTreatmentNotificationDto);
                var NotificationTemplateData = await _emailTemplateAppService.RenderTemplateNotification("RisksTreatmentNewTemplates", expandoDataNotification);

                var PushNotification = new Notification(
                    _guidGenerator.Create(),
                    "ComplianceSystem",
                    null,
                    _currentUser.Id.ToString(),
                    null,
                    null,
                    emailTemplate.Subject,
                    Priority.Normal,
                    NotificationType.Push,
                    Notifications.Status.NotSeen,
                    _clock.Now,
                    NotificationTemplateData.NotificationBody,
                    true,
                    true,
                    null,
                    null,
                    NotySource.RiskTreatment,
                    eventData.Entity.Id,
                    false
                    );
                notificationList.Add(PushNotification);

                await _notificationsRepository.InsertManyAsync(notificationList, true);
                foreach (var notificatio in notificationList.Where(t => t.Type == NotificationType.Push))
                {
                    await _notificationAppService.NotifyUser(Guid.Parse(notificatio.To));

                }
            }
        }
    }