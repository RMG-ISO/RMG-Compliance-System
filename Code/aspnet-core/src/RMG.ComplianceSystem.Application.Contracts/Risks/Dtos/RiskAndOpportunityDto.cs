using RMG.ComplianceSystem.Attachments.Dtos;
using RMG.ComplianceSystem.RiskTreatments;
using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Risks.Dtos
{
    [Serializable]
    public class RiskAndOpportunityDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public string DetailsAr { get; set; }
        public string DetailsEn { get; set; }
        public string AffectDetailsAr { get; set; }
        public string AffectDetailsEn { get; set; }
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
        public int? RiskContext { get; set; }


        //Analysis--------------------
        public string ExistingControl { get; set; }
        // ControlAssessment (Enum)
        public int? ControlAssessment { get; set; }
        // Likelihood (Enum)
        public int? Likelihood { get; set; }
        // Impact (Enum)
        public int? Impact { get; set; }


        //Evaluation---------------------------
        // PotentialRisk (Enum)
        public int? PotentialRisk { get; set; }
        public string RiskTreatmentOption { get; set; }


        //Risk Treatment/ Action Plan---------------------------
        //public string MitigateActionPlan { get; set; }
        //public string StandardReference { get; set; }
        //public string ObjectiveEvidence { get; set; }
        //public Guid? Responsibility { get; set; }
        //public DateTime? ByWhen { get; set; }
        //public string TreatmentRemarks { get; set; }
        public virtual ICollection<RiskTreatmentDto> RiskTreatmentDto { get; set; }
        // PotentialRisk (Enum)
        public int? ReEvaluation { get; set; }

        //Risk Monitoring &  Review---------------------------

        public bool Acceptance { get; set; } = false;
        public Guid? AcceptanceApprovedby { get; set; }
        public string ReviewControlAssessment { get; set; }
        public string ReviewRemarks { get; set; }


    }

  

}
