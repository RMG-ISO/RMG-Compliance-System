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
        public string MitigateActionPlan { get; set; }
        public string StandardReference { get; set; }
        public string ObjectiveEvidence { get; set; }
        public Guid? Responsibility { get; set; }
        public DateTime? ByWhen { get; set; }
        public string TreatmentRemarks { get; set; }
        // PotentialRisk (Enum)
        public int? ReEvaluation { get; set; }
        public virtual RiskAndOpportunityDto RiskAndOpportunityDto { get; set; }
    }
}
