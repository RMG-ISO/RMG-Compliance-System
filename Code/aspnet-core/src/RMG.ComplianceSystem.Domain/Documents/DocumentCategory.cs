using Microsoft.AspNetCore.Identity;
using Volo.Abp.Identity;
using RMG.ComplianceSystem.Attachments;
using System;
using Volo.Abp.Domain.Entities.Auditing;
using System.Collections.Generic;

namespace RMG.ComplianceSystem.Documents
{
    public class DocumentCategory : FullAuditedAggregateRootWithUser<Guid, Volo.Abp.Identity.IdentityUser>
    {
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public Guid TenantId { get; set; }    
        public virtual ICollection<Document> Documents { get; set; }
    }
}
