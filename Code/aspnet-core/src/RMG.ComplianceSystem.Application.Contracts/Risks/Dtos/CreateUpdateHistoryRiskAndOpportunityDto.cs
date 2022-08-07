using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Risks
{
    [Serializable]
    public class CreateUpdateHistoryRiskAndOpportunityDto
    {
        public Guid UserId { get; set; }
        public Guid RiskAndOpportunityId { get; set; }
        public string ActionName { get; set; }
        public DateTime ActionDate { get; set; }
    }
}
