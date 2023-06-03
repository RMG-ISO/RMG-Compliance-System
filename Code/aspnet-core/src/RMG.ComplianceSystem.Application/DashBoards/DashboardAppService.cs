using Microsoft.AspNetCore.SignalR;
using RMG.ComplianceSystem.Notifications;
using RMG.ComplianceSystem.Risks.IRepository;
using RMG.ComplianceSystem.RiskTreatments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.AspNetCore.SignalR;

namespace RMG.ComplianceSystem.DashBoards
{
    public class DashboardAppService
    {

        private readonly IRiskAndOpportunityRepository RiskAndOpportunityRepository;
        private readonly IHubContext<NotificationHub> _notificationHubContext;
        private readonly IRiskTreatmentRepository RiskTreatmentRepository;
        public DashboardAppService(IRiskAndOpportunityRepository _riskAndOpportunityRepository, IHubContext<NotificationHub> notificationHubContext, IRiskTreatmentRepository _riskTreatmentRepository)
        {
            RiskAndOpportunityRepository= _riskAndOpportunityRepository;
            RiskTreatmentRepository = _riskTreatmentRepository;
            _notificationHubContext = notificationHubContext;
        }
        public async Task SendRisksAndOpportunities()
        {
            var ListRisks = (await RiskAndOpportunityRepository.GetQueryableAsync()).ToList();
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
