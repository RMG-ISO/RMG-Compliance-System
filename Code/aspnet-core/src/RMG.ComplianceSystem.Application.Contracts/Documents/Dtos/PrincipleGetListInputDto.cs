using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class PrincipleGetListInputDto : PagedAndSortedResultRequestDto
    {
        public Guid? DocumentId { get; set; }
    }
}