using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class DocumentSectionGetListInputDto : PagedAndSortedResultRequestDto
    {
        public Guid? DocumentId { get; set; }
    }
}