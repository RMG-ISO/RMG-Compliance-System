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

        public bool? HasPriority { get; set; }
        public bool? IsDocumented { get; set; }
        public bool? IsEffective { get; set; }
        public bool? IsImplemented { get; set; }
        public int? Level { get; set; }
        public Guid? DepartmentId { get; set; }
        public Guid? OwnerId { get; set; }

    }
}
