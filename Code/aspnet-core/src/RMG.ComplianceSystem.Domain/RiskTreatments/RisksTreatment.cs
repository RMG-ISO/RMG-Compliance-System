using RMG.ComplianceSystem.Risks.Entity;
using RMG.ComplianceSystem.Attachments;
using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.RiskTreatments
{
    public class RisksTreatment : FullAuditedAggregateRootWithUser<Guid, Volo.Abp.Identity.IdentityUser>
    {
        public Guid RiskOpportunityId { get; set; }
        public string MitigateActionPlanEn { get; set; }
        public string MitigateActionPlanAr { get; set; }
        public string ActionDetailsEn { get; set; }
        public string ActionDetailsAr { get; set; }
        public Guid? Responsibility { get; set; }
        public int? Status { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? CompletionDate { get; set; }
        public DateTime? StartDate { get; set; }
        public decimal? AchievementPercentage { get; set; }
        public Guid? AttachmentId { get; set; }
        public virtual Attachment Attachment { get; set; }
        public virtual RiskOpportunity RiskAndOpportunity { get; set; }
    }
}
