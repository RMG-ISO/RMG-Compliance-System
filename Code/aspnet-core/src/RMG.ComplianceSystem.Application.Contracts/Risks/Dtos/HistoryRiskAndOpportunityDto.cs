using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Risks.Dtos
{
    [Serializable]
    public class HistoryRiskAndOpportunityDto:AuditedEntityDto<Guid>
    {
        public Guid UserId { get; set; }
        public Guid RiskAndOpportunityId { get; set; }
        public int? WorkFlowStages { get; set; }
        public int? ActionName { get; set; }
        public DateTime ActionDate { get; set; }
        public IdentityUserDto Creator { get; set; }
    }
  
}
