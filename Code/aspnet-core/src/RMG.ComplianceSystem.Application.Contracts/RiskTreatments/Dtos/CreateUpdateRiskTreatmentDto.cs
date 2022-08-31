using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.RiskTreatments
{
    [Serializable]
    public class CreateUpdateRiskTreatmentDto
    {
        public Guid RiskOpportunityId { get; set; }
        public string MitigateActionPlanEn { get; set; }
        public string MitigateActionPlanAr { get; set; }
        public string StandardReferenceEn { get; set; }
        public string StandardReferenceAr { get; set; }
        public string ObjectiveEvidenceEn { get; set; }
        public string ObjectiveEvidenceAr { get; set; }
        public Guid? StandardReference { get; set; }
        public Guid? Responsibility { get; set; }
        public DateTime? ByWhen { get; set; }
        public string TreatmentRemarks { get; set; }
        // PotentialRisk (Enum)
        public Guid? ReEvaluation { get; set; }

    }
}
