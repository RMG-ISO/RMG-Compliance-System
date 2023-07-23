using RMG.ComplianceSystem.Policies;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class DocumentSectionGetListInputDto : PagedAndSortedResultRequestDto
    {
        public Guid? DocumentId { get; set; }
    }
}