using RMG.ComplianceSystem.Departments;
using RMG.ComplianceSystem.Frameworks;
using RMG.ComplianceSystem.Risks.Entity;
using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.InternalAuditPreparations
{
    public class InternalAuditPreparation : FullAuditedAggregateRootWithUser<Guid, Volo.Abp.Identity.IdentityUser>
    {
       
        public string AuditCode { get; set; }
        public string AuditTitleEn { get; set; }
        public string AuditTitleAr { get; set; }
        public string AuditDescriptionEn { get; set; }
        public string AuditDescriptionAr { get; set; }
        public string AuditFieldEn { get; set; }
        public string AuditFieldAr { get; set; }
        public string AuditSetpsEn { get; set; }
        public string AuditSetpsAr { get; set; }
        public string AuditGoalsEn { get; set; }
        public string AuditGoalsAr { get; set; }
        public Guid DepartmentId { get; set; }
        public virtual Department Department { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid RiskOpportunityId { get; set; }
        public virtual RiskOpportunity RiskOpportunity { get; set; }
        public Guid FrameworkId { get; set; }
        public virtual Framework Framework { get; set; }


        public Boolean? IsApprove { get; set; }
        public DateTime? approveDate { get; set; }
        public Guid? ApproveBy { get; set; }
        public string CausesRefuse { get; set; }
    }
}
