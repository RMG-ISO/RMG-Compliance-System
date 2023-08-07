using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.Documents
{
    public class Principle : FullAuditedEntity<Guid>
    {
        public Guid DocumentId { get; set; }
        public Document Document { get; set; }
        public string Reference { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ComplianceScore { get; set; }
        public PrincipleStatus? ComplianceStatus { get; set; }
        public Guid? AttachmentId { get; set; }
        public string ComplianceComment { get; set; }
        public List<PrincipleControl> PrincipleControls { get; set; } = new List<PrincipleControl>();
    }
}
