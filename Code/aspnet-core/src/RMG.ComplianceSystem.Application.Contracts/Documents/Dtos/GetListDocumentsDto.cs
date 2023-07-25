using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class GetListDocumentsDto : PagedAndSortedResultRequestDto
    {
        public DocumentStatus? Status { get; set; }
        public DocumentType? Type { get; set; }
    }
}
