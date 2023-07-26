using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.Documents
{
    public class DocumentSection : FullAuditedEntity<Guid>
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int Order { get; set; }
        public DocumentSectionStatus Status { get; set; }
        public Guid DocumentId { get; set; }
        public Document Document { get; set; }
    }
}
