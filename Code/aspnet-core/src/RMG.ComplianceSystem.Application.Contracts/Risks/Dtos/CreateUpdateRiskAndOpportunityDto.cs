using System;
using System.ComponentModel.DataAnnotations;

namespace RMG.ComplianceSystem.Risks.Dtos
{
    [Serializable]
    public class CreateUpdateRiskAndOpportunityDto
    {
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public string DetailsAr { get; set; }
        public string DetailsEn { get; set; }
        public string AffectDetailsAr { get; set; }
        public string AffectDetailsEn { get; set; }
        public Guid? FrameWorkId { get; set; }
        //  status (Enum)
        public int status { get; set; }
        
        // المواصفه
        public Guid? StandardId { get; set; }
        // القطاع
        public Guid? SectorId { get; set; }
        //الادارة العامة
        public Guid? GeneralDepartmentId { get; set; }
        // الادارة
        public Guid? DepartmentId { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? OwnerId { get; set; }
        // Opportunity - Risk (Enum)
        public int? Type { get; set; }
        //  WorkFlowStages (Enum)
        public int? WorkFlowStages { get; set; }
        // RiskContext (Enum)
        public Guid? RiskContext { get; set; }


        //Analysis--------------------
        public string ExistingControlEn { get; set; }
        public string ExistingControlAr { get; set; }
        // ControlAssessment (Enum)
        public Guid? ControlAssessment { get; set; }
        public int? NumberMatrix { get; set; }
        public int? Likelihood { get; set; }
        public int? Impact { get; set; }

        //Evaluation---------------------------
        // PotentialRisk (Enum)
        public int? Potential { get; set; }
        public bool? IsTreatment { get; set; }
        public Guid? RiskTreatmentOption { get; set; }


        //Risk Treatment/ Action Plan---------------------------
        //public string MitigateActionPlan { get; set; }
        //public string StandardReference { get; set; }
        //public string ObjectiveEvidence { get; set; }
        //public Guid? Responsibility { get; set; }
        //public DateTime? ByWhen { get; set; }
        //public string TreatmentRemarks { get; set; }
        public int? ReEvaluation { get; set; }

        //Risk Monitoring &  Review---------------------------

        public bool Acceptance { get; set; } = false;
        public Guid? AcceptanceApprovedby { get; set; }
        public string ReviewControlAssessment { get; set; }
        public string ReviewRemarks { get; set; }

    }
}
