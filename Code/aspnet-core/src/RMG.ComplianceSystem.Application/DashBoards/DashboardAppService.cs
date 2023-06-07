using Microsoft.AspNetCore.SignalR;
using RMG.ComplianceSystem.Dashboards.Dtos;
using RMG.ComplianceSystem.Frameworks;
using RMG.ComplianceSystem.Notifications;
using RMG.ComplianceSystem.Risks.IRepository;
using RMG.ComplianceSystem.RiskTreatments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.AspNetCore.SignalR;

namespace RMG.ComplianceSystem.Dashboards
{
    public class DashboardAppService : ComplianceSystemAppService
    {
        private readonly IFrameworkRepository _frameworkRepository;
        private readonly IRiskAndOpportunityRepository RiskAndOpportunityRepository;
        private readonly IHubContext<NotificationHub> _notificationHubContext;
        private readonly IRiskTreatmentRepository RiskTreatmentRepository;
        public DashboardAppService(
            IRiskAndOpportunityRepository _riskAndOpportunityRepository, 
            IHubContext<NotificationHub> notificationHubContext, 
            IRiskTreatmentRepository _riskTreatmentRepository,
            IFrameworkRepository frameworkRepository)
        {
            RiskAndOpportunityRepository= _riskAndOpportunityRepository;
            RiskTreatmentRepository = _riskTreatmentRepository;
            _notificationHubContext = notificationHubContext;
            _frameworkRepository = frameworkRepository;
        }

        public async Task<DashboardDto> GetDashboard()
        {
            var frameworks = _frameworkRepository.Select(f => f.Id).ToList();
            var rnd = new Random();
            var dashboard = new DashboardDto
            {
                ActionsCount = rnd.Next(0, 100),
                ActiveFrameworksCount = rnd.Next(0, 100),
                ActiveUsersCount = rnd.Next(0, 100),
                AuditsCount = rnd.Next(0, 100),
                DepartmentsCount = rnd.Next(0, 100),
                FrameworksCount = rnd.Next(0, 100),
                ImplementedCompliantFrameworksCount = rnd.Next(0, 100),
                RisksCount = rnd.Next(0, 100),
                UsersCount = rnd.Next(0, 100),
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
                    ClosedRisksCount = rnd.Next(0, 100),
                    OpenRisksCount = rnd.Next(0, 100),
                    UnderRevisionRisksCount = rnd.Next(0, 100),
                },
                RisksLevelDto = new DashboardRisksLevelDto
                {
                    HighCount = rnd.Next(0, 100),
                    LowCount = rnd.Next(0, 100),
                    MediumCount = rnd.Next(0, 100),
                }
            };
            foreach (var id in frameworks)
            {
                dashboard.FrameworkCompliancePercentage.Add(new DashboardFrameworkCompliancePercentage
                {
                    FrameworkId = id,
                    CompliantCount = rnd.Next(0, 100),
                    NotCompliantCount = rnd.Next(0, 100),
                    PartialCompliantCount = rnd.Next(0, 100),
                });
            }
            
            return dashboard;
        }

        [RemoteService(false)]
        public async Task SendRisksAndOpportunities()
        {
            var ListRisks = RiskAndOpportunityRepository.ToList();
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
