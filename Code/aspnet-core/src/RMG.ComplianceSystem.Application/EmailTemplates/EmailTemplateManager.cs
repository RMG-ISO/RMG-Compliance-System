using RMG.ComplianceSystem.Departments;
using RMG.ComplianceSystem.Employees;
using RMG.ComplianceSystem.Notifications;
using RMG.ComplianceSystem.Notifications.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Services;
using Volo.Abp.Identity;
using Volo.Abp.Timing;
using Volo.Abp.Users;
using Microsoft.AspNetCore.Http;
using RMG.ComplianceSystem.RiskTreatments;
using Volo.Abp.Domain.Entities.Events;
using Volo.Abp.Guids;

namespace RMG.ComplianceSystem.EmailTemplates
{
    public class EmailTemplateManager : DomainService, IEmailTemplateManager
    {
        private readonly IRiskTreatmentRepository _riskTreatmentRepository;
        private readonly IIdentityUserRepository _identityUserRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IEmailTemplateRepository _emailTemplateRepository;
        private readonly IEmailTemplateAppService _emailTemplateAppService;
        private readonly INotificationRepository _notificationRepository;
        private readonly INotificationAppService _notificationAppService;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ICurrentUser _currentUser;
        private readonly IClock _clock;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IGuidGenerator _guidGenerator;
        private readonly INotificationRepository _notificationsRepository;
        private readonly HttpContext _httpContext;
        public EmailTemplateManager(IRiskTreatmentRepository riskTreatmentRepository,
                                    IIdentityUserRepository identityUserRepository,
                                    IDepartmentRepository departmentRepository,
                                    IEmailTemplateRepository emailTemplateRepository,
                                    IEmailTemplateAppService emailTemplateAppService,
                                    INotificationRepository notificationRepository,
                                    INotificationAppService notificationAppService,
                                    IEmployeeRepository employeeRepository,
                                    ICurrentUser currentUser,
                                    IClock clock,
                                    IGuidGenerator guidGenerator,
                                    INotificationRepository notificationsRepository,
                                    IHttpContextAccessor httpContextAccessor)
        {
            _notificationsRepository = notificationsRepository;
            _guidGenerator = guidGenerator;
            _riskTreatmentRepository = riskTreatmentRepository;
            _identityUserRepository = identityUserRepository;
            _departmentRepository = departmentRepository;
            _emailTemplateRepository = emailTemplateRepository;
            _emailTemplateAppService = emailTemplateAppService;
            _notificationRepository = notificationRepository;
            _notificationAppService = notificationAppService;
            _employeeRepository = employeeRepository;
            _currentUser = currentUser;
            _clock = clock;
            _httpContextAccessor = httpContextAccessor;
            _httpContext = httpContextAccessor.HttpContext;
        }

        public string GetURI()
        {
            var httpContext = _httpContextAccessor.HttpContext ?? _httpContext;
            string url = httpContext?.Request?.Scheme + "://" + httpContext?.Request?.Host;//.Headers?["Referer"];
            //url.Substring(url.IndexOf("swagger"));
            return url;
        }

        public async Task OnAddRiskTreatmentSendToRiskTreatment(EntityCreatedEventData<RisksTreatment> eventData, string hostName)
        {
            List<Notification> notificationList = new List<Notification>();
            var emailTemplate = await _emailTemplateRepository.GetAsync(x => x.Key == "RisksTreatment");
            var existingRisksTreatment = await _riskTreatmentRepository.GetAsync(eventData.Entity.Id);

          

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
        public async Task OnAddRiskTreatmentSendToRiskTreatment()
        {
            var notificationList = _notificationRepository.Where(t => t.Type == NotificationType.Push).ToList();
            foreach (var notificatio in notificationList)
            {
                await _notificationAppService.NotifyUser(Guid.Parse(notificatio.To));
            }
        }

    }
}
