using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class DocumentActionLog : CreationAuditedEntity<Guid>
    {
        public Guid DocumentId { get; set; }
        public Document Document { get; set; }

        public string Notes { get; set; }
        public DocumentStatus Status { get; set; }

        protected DocumentActionLog()
        {
            
        }

        public DocumentActionLog(Guid id, Guid documentId, string notes, DocumentStatus status)        {
            Id = id;
            DocumentId = documentId;
            Notes = notes;
            Status = status;
        }

    }
}
