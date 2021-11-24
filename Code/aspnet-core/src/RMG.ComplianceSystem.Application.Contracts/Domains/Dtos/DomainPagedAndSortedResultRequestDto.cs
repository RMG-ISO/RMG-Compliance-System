using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Domains.Dtos
{
    public class DomainPagedAndSortedResultRequestDto : PagedAndSortedResultRequestDto
    {
        public Guid? FrameworkId { get; set; }
        public Guid? MainDomainId { get; set; }
        public bool IsMainDomain { get; set; }
        public string Search { get; set; }
        public SharedStatus? Status { get; set; }

    }
}
