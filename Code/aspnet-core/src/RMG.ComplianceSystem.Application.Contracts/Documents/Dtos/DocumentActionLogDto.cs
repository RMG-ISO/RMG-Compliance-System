using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class DocumentActionLogDto : CreationAuditedEntityDto<Guid>
    {
        public string CreatorName { get; set; }
        public string Notes { get; set; }
        public DocumentStatus Status { get; set; }
    }
}
