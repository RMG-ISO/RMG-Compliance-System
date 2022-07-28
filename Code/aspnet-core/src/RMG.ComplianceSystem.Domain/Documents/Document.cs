using Microsoft.AspNetCore.Identity;
using Volo.Abp.Identity;
using RMG.ComplianceSystem.Attachments;
using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.Documents
{
    public class Document : FullAuditedAggregateRootWithUser<Guid, Volo.Abp.Identity.IdentityUser>
    {
        public string TitleAr { get; set; }
        public string TitleEn { get; set; }
        public Guid CategoryId { get; set; }
        public Guid AttachmentId { get; set; }
        public virtual Attachment Attachment { get; set; }
        public virtual DocumentCategory DocumentCategory { get; set; }

    }
}
