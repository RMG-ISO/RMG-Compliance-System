using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.RiskTreatments
{
    [Serializable]
    public class CreateUpdateRiskTreatmentDto
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

    }
}
