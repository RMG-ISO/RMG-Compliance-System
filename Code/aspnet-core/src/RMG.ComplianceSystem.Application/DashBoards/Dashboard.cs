using Microsoft.AspNetCore.SignalR;
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
    [HubRoute("/Dashboard")]
    public class Dashboard:Hub
    {

        private readonly IRiskAndOpportunityRepository RiskAndOpportunityRepository;

        private readonly IRiskTreatmentRepository RiskTreatmentRepository;
        public Dashboard(IRiskAndOpportunityRepository _riskAndOpportunityRepository, IRiskTreatmentRepository _riskTreatmentRepository)
        {
            RiskAndOpportunityRepository= _riskAndOpportunityRepository;
            RiskTreatmentRepository = _riskTreatmentRepository;
        }
        public async Task SendPotentailRisks()
        {
            var ListRisks = RiskAndOpportunityRepository.Where(x => x.Type == 1).ToList();
            await Clients.All.SendAsync("PotentailRisks", ListRisks);
        }
        public async Task SendStatusRisks()
        {
            var ListRisks = RiskAndOpportunityRepository.Where(x => x.Type == 1).ToList();
            await Clients.All.SendAsync("SendStatusRisks", ListRisks);
        }
        public async Task getNotification()
        {
           var Treatments= RiskTreatmentRepository.Where(t => t.Status == 1).ToList();
            foreach (var item in Treatments)
            {
                await Clients.User(item.Responsibility.ToString()).SendAsync("TreatmentRisks", item);
            }
           
        }

    }
}
