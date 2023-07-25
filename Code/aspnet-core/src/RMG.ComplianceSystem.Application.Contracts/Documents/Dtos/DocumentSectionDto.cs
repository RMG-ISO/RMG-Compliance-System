using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class DocumentSectionDto : FullAuditedEntityDto<Guid>
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int Order { get; set; }
        public DocumentSectionStatus Status { get; set; }
        public Guid DocumentId { get; set; }
    }
}