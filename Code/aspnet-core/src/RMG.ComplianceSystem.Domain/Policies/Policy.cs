using Microsoft.AspNetCore.Identity;
using Volo.Abp.Identity;
using RMG.ComplianceSystem.Attachments;
using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.Policies
{
        public class Policy : FullAuditedAggregateRootWithUser<Guid, Volo.Abp.Identity.IdentityUser>
    {
            public string Title { get; set; }
            public string TermsAndPrivacy { get; set; }
            public bool Approve { get; set; }
            public int CompanyId { get; set; }
            public Guid AttachmentId { get; set; }

            public virtual Attachment Attachment { get; set; }
        }
}
