﻿using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.Risks.Entity
{
    public class HistoryRiskAndOpportunity : AuditedAggregateRoot<Guid>
    {
        public Guid Id { get; set; }    
        public Guid UserId { get; set; }
        public Guid RiskAndOpportunityId { get; set; }
        public string ActionName { get; set; }
        public DateTime ActionDate { get; set; }
    }
}