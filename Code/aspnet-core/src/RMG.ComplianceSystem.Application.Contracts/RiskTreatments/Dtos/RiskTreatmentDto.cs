using RMG.ComplianceSystem.Risks.Dtos;
using RMG.ComplianceSystem.Attachments.Dtos;
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
        public string ActionDetailsEn { get; set; }
        public string ActionDetailsAr { get; set; }
        public Guid? Responsibility { get; set; }
        public string ResponsibilityName { get; set; }
        public int? Status { get; set; } 
        public string StatusNameEn { get; set; }
        public string StatusNameAr { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? StartDate { get; set; }
        public decimal? AchievementPercentage { get; set; }
        public Guid? AttachmentId { get; set; }
        public virtual AttachmentDto Attachment { get; set; }
        public virtual RiskAndOpportunityDto RiskAndOpportunity { get; set; }
    }
}
