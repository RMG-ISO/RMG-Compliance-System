using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class DocPagedAndSortedResultRequestDto : PagedAndSortedResultRequestDto
    {
        public string Search { get; set; }
        public Guid? CategoryId { get; set; }
    }
}
