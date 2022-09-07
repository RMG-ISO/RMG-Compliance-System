using RMG.ComplianceSystem.Attachments.Dtos;
using RMG.ComplianceSystem.Risks.Dtos;
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
        public string ActionDetailsEn { get; set; }
        public string ActionDetailsAr { get; set; }
        public Guid? Responsibility { get; set; }

        public int? Status { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? StartDate { get; set; }
        public decimal? AchievementPercentage { get; set; }
        public Guid? AttachmentId { get; set; }
        public virtual AttachmentDto Attachment { get; set; }
        public virtual RiskAndOpportunityDto RiskAndOpportunity { get; set; }
    }
}
