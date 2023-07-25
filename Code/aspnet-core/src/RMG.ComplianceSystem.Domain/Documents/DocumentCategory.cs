using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.Documents
{
    public class DocumentCategory : CreationAuditedEntity<Guid>
    {
        public Guid DocumentId { get; set; }
        public Guid CategoryId { get; set; }
        public Document Document { get; set; }
        public Category Category { get; set; }

        protected DocumentCategory()
        {
            
        }

        public DocumentCategory(
            Guid id, 
            Guid categoryId)
        {
            Id = id;
            CategoryId = categoryId;
        }
    }
}
