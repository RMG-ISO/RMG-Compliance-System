using RMG.ComplianceSystem.Risks.Entity;
using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.RiskTreatments
{
    public class RisksTreatment : FullAuditedAggregateRootWithUser<Guid, Volo.Abp.Identity.IdentityUser>
    {
        public Guid RiskOpportunityId { get; set; }    
        public string MitigateActionPlan { get; set; }
        public string StandardReference { get; set; }
        public string ObjectiveEvidence { get; set; }
        public Guid? Responsibility { get; set; }
        public DateTime? ByWhen { get; set; }
        public string TreatmentRemarks { get; set; }
        // PotentialRisk (Enum)
        public int? ReEvaluation { get; set; }
        public virtual RiskOpportunity RiskAndOpportunity { get; set; }
    }
}
