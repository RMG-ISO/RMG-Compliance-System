using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Attachments
{
    public class AttachmentFile : FullAuditedEntityWithUser<Guid, IdentityUser>
    {
        public string Name { get; set; }
        public double Size { get; set; }
        public string DisplayName { get; set; }
        public string Extention { get; set; }
        public Guid AttachmentId { get; set; }

        public virtual Attachment Attachment { get; set; }

        protected AttachmentFile()
        {
        }

        public AttachmentFile(
            Guid id,
            string name,
            double size,
            string displayName,
            string extention,
            Guid attachmentId,
            Attachment attachment
        ) : base(id)
        {
            Name = name;
            Size = size;
            DisplayName = displayName;
            Extention = extention;
            AttachmentId = attachmentId;
            Attachment = attachment;
        }

        public AttachmentFile(
         Guid id,
         string name,
         double size,
         string displayName,
         string extention,
         Guid attachmentId
     ) : base(id)
        {
            Name = name;
            Size = size;
            DisplayName = displayName;
            Extention = extention;
            AttachmentId = attachmentId;
        }

        public AttachmentFile(
         Guid id,
         string name,
         double size,
         string displayName,
         string extention
     ) : base(id)
        {
            Name = name;
            Size = size;
            DisplayName = displayName;
            Extention = extention;
        }
    }
}
