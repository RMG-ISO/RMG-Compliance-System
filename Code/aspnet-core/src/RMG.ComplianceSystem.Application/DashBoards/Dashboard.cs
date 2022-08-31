using Microsoft.AspNetCore.SignalR;
using RMG.ComplianceSystem.Risks.IRepository;
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
        public Dashboard(IRiskAndOpportunityRepository _riskAndOpportunityRepository)
        {
            RiskAndOpportunityRepository= _riskAndOpportunityRepository;    
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
    }
}
