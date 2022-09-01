using RMG.ComplianceSystem.Risks.Entity;
using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.RiskTreatments
{
    public class RisksTreatment : FullAuditedAggregateRootWithUser<Guid, Volo.Abp.Identity.IdentityUser>
    {
        public Guid RiskOpportunityId { get; set; }
        public string MitigateActionPlanEn { get; set; }
        public string MitigateActionPlanAr { get; set; }
        public string StandardReferenceEn { get; set; }
        public string StandardReferenceAr { get; set; }
        public string ObjectiveEvidenceEn { get; set; }
        public string ObjectiveEvidenceAr { get; set; }
        public Guid? StandardReference { get; set; }
        public Guid? ChangeStatus { get; set; }
        public Guid? Likelihood { get; set; }
        public Guid? Impact { get; set; }
        public Guid? Potential { get; set; }
        public Guid? Responsibility { get; set; }
        public DateTime? ByWhen { get; set; }
        public string TreatmentRemarks { get; set; }
        // PotentialRisk (Enum)
        public Guid? ReEvaluation { get; set; }
        public virtual RiskOpportunity RiskAndOpportunity { get; set; }
    }
}
