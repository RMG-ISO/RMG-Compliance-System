using RMG.ComplianceSystem.Frameworks;
using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.InternalAuditQuestions
{
    public class InternalAuditQuestion : FullAuditedAggregateRootWithUser<Guid, Volo.Abp.Identity.IdentityUser>
    {
        public string QuestionTextEn { get; set; }
        public string QuestionTextAr { get; set; }
        public string QuestionExplainEn { get; set; }
        public string QuestionExplainAr { get; set; }
        public Guid FrameworkId { get; set; }
        public virtual Framework Framework { get; set; }
    }
}
