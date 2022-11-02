using RMG.ComplianceSystem.Departments;
using RMG.ComplianceSystem.Frameworks;
using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.InternalAuditQuestions
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
        public string DepartmentId { get; set; }
        public virtual Department Department { get; set; }



        public Guid FrameworkId { get; set; }
        public virtual Framework Framework { get; set; }
    }
}
