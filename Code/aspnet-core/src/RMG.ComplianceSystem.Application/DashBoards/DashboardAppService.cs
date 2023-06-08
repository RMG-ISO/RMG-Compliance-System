using DocumentFormat.OpenXml.Office2010.Excel;
using Microsoft.AspNetCore.SignalR;
using RMG.ComplianceSystem.Dashboards.Dtos;
using RMG.ComplianceSystem.Departments;
using RMG.ComplianceSystem.Frameworks;
using RMG.ComplianceSystem.InternalAuditPreparations;
using RMG.ComplianceSystem.Notifications;
using RMG.ComplianceSystem.Risks.Enums;
using RMG.ComplianceSystem.Risks.IRepository;
using RMG.ComplianceSystem.RiskTreatments;
using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.AspNetCore.SignalR;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Dashboards
{
    public class DashboardAppService : ComplianceSystemAppService
    {
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IFrameworkRepository _frameworkRepository;
        private readonly IFrameworkAppService _frameworkAppService;
        private readonly IRiskAndOpportunityRepository _riskAndOpportunityRepository;
        private readonly IHubContext<NotificationHub> _notificationHubContext;
        private readonly IRiskTreatmentRepository _riskTreatmentRepository;
        private readonly IInternalAuditPreparationRepository _internalAuditPreparationRepository;
        private readonly IIdentityUserRepository _identityUserRepository;

        public DashboardAppService(
            IRiskAndOpportunityRepository riskAndOpportunityRepository, 
            IHubContext<NotificationHub> notificationHubContext, 
            IRiskTreatmentRepository riskTreatmentRepository,
            IFrameworkAppService frameworkAppService,
            IIdentityUserRepository identityUserRepository,
            IInternalAuditPreparationRepository internalAuditPreparationRepository,
            IDepartmentRepository departmentRepository,
            IFrameworkRepository frameworkRepository)
        {
            _riskAndOpportunityRepository= riskAndOpportunityRepository;
            _riskTreatmentRepository = riskTreatmentRepository;
            _notificationHubContext = notificationHubContext;
            _frameworkRepository = frameworkRepository;
            _departmentRepository = departmentRepository;
            _frameworkAppService = frameworkAppService;
            _identityUserRepository = identityUserRepository;
            _internalAuditPreparationRepository = internalAuditPreparationRepository;
        }

        public async Task<DashboardDto> GetDashboard()
        {
            var usersCount = await _identityUserRepository.GetCountAsync();
            var rnd = new Random();
            var dashboard = new DashboardDto
            {
                ActionsCount = _riskTreatmentRepository.Count(),
                ActiveFrameworksCount = _frameworkRepository.Count(f => f.Status == SharedStatus.Active),
                ActiveUsersCount = (int)usersCount,
                AuditsCount = _internalAuditPreparationRepository.Count(),
                DepartmentsCount = _departmentRepository.Count(),
                FrameworksCount = _frameworkRepository.Count(),
                ImplementedCompliantFrameworksCount = _frameworkRepository.Count(f => f.ComplianceStatus == ComplianceStatus.Approved),
                RisksCount = _riskAndOpportunityRepository.Count(r => r.Type == (int)TypeRiskAndOpportunity.Risk),
                UsersCount = (int)usersCount,
                ActionsDto = new DashboardActionsDto
                {
                    DoneActionsCount = rnd.Next(0, 100),
                    InProgressActionsCount = rnd.Next(0, 100),
                    LateActionsCount = rnd.Next(0, 100),
                    NotStartedActionsCount = rnd.Next(0, 100),
                },
                AuditsDto = new DashboardAuditsDto
                {
                    DoneAuditsCount = rnd.Next(0, 100),
                    LateAuditsCount = rnd.Next(0, 100),
                    UnderExecutionAuditsCount = rnd.Next(0, 100),
                    UnderPreparationAuditsCount = rnd.Next(0, 100),
                },
                RisksDto = new DashboardRisksDto
                {
                    ClosedRisksCount = _riskAndOpportunityRepository.Count(r => r.status == (int)status.Close),
                    OpenRisksCount = _riskAndOpportunityRepository.Count(r => r.status == (int)status.Open),
                    UnderRevisionRisksCount = rnd.Next(0, 100),
                },
                RisksLevelDto = new DashboardRisksLevelDto
                {
                    HighCount = rnd.Next(0, 100),
                    LowCount = rnd.Next(0, 100),
                    MediumCount = rnd.Next(0, 100),
                }
            };
            var frameworks = _frameworkRepository.Where(f => f.ComplianceStatus == ComplianceStatus.Approved).Select(f => f.Id).ToList();
            var frameworksCompliance = new Dictionary<Guid, int>();
            foreach (var id in frameworks)
            {
                frameworksCompliance.Add(id, _frameworkAppService.CalculateCompliancePercentage(id));
                
            }
            dashboard.FrameworkCompliancePercentage.Add(new DashboardFrameworkCompliancePercentage
            {
                //FrameworkId = id,
                CompliantCount = frameworksCompliance.Count(f => f.Value >= AppConsts.FrameworkCompliantBoundaries.CompliantLowerLimit),
                NotCompliantCount = frameworksCompliance.Count(f => f.Value < AppConsts.FrameworkCompliantBoundaries.NotCompliantUpperLimit),
                PartialCompliantCount = frameworksCompliance.Count(f => f.Value >= AppConsts.FrameworkCompliantBoundaries.NotCompliantUpperLimit && f.Value < AppConsts.FrameworkCompliantBoundaries.CompliantLowerLimit),
            });
            return dashboard;
        }

        [RemoteService(false)]
        public async Task SendRisksAndOpportunities()
        {
            var ListRisks = _riskAndOpportunityRepository.ToList();
            await _notificationHubContext.Clients.All.SendAsync("RisksOpportunities", ListRisks);
        }
        //public async Task SendStatusRisks()
        //{
        //    var ListRisks = RiskAndOpportunityRepository.Where(x => x.Type == 1).ToList();
        //    await _notificationHubContext.Clients.All.SendAsync("SendStatusRisks", ListRisks);
        //}
        //public async Task getNotification()
        //{
        //   var Treatments= RiskTreatmentRepository.Where(t => t.Status == 1).ToList();
        //    foreach (var item in Treatments)
        //    {
        //        await _notificationHubContext.Clients.User(item.Responsibility.ToString()).SendAsync("TreatmentRisks", item);
        //    }
           
        //}

    }
}
