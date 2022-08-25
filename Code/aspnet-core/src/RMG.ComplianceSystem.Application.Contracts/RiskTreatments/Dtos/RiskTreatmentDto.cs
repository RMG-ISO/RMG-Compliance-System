using RMG.ComplianceSystem.Risks.Dtos;
using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.RiskTreatments
{
    [Serializable]
    public class RiskTreatmentDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public Guid RiskOpportunityId { get; set; }
        public string MitigateActionPlanEn { get; set; }
        public string MitigateActionPlanAr { get; set; }
        public string StandardReferenceEn { get; set; }
        public string StandardReferenceAr { get; set; }
        public string ObjectiveEvidenceEn { get; set; }
        public string ObjectiveEvidenceAr { get; set; }
        public Guid? Responsibility { get; set; }
        public string ResponsibilityName { get; set; }
        public DateTime? ByWhen { get; set; }
        public string TreatmentRemarks { get; set; }
        // PotentialRisk (Enum)
        public Guid? ReEvaluation { get; set; }
        public virtual RiskAndOpportunityDto RiskAndOpportunityDto { get; set; }
    }
}
