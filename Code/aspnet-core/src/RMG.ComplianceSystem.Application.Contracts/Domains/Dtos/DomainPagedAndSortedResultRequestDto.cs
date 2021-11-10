using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Domains.Dtos
{
    public class DomainPagedAndSortedResultRequestDto : PagedAndSortedResultRequestDto
    {
        public bool IsMainDomain { get; set; }
        public string Search { get; set; }
    }
}
