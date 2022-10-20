using RMG.ComplianceSystem.Frameworks;
using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.InternalAuditQuestionLists
{
    public class InternalAuditMenuQuestion : FullAuditedAggregateRootWithUser<Guid, Volo.Abp.Identity.IdentityUser>
    {
        public string MenuTextEn { get; set; }
        public string MenuTextAr { get; set; }
        public bool IsEditable { get; set; }
        public Guid FrameworkId { get; set; }
        public virtual Framework Framework { get; set; }
        
    }
}
