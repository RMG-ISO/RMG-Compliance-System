using Volo.Abp.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.Attachments
{
    public class Attachment : FullAuditedAggregateRootWithUser<Guid, IdentityUser>
    {
        public bool IsMultiple { get; set; } = true;
        public int MaxFileSize { get; set; } = 10;
        public string FileExtentions { get; set; }

        public virtual ICollection<AttachmentFile> AttachmentFiles { get; set; }

        protected Attachment()
        {
        }

        public Attachment(
            Guid id,
            bool isMultiple,
            int maxFileSize,
            string fileExtentions,
            ICollection<AttachmentFile> attachmentFiles
        ) : base(id)
        {
            IsMultiple = isMultiple;
            MaxFileSize = maxFileSize;
            FileExtentions = fileExtentions;
            AttachmentFiles = attachmentFiles;
        }
    }
}
