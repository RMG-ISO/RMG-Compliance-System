using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Frameworks.Dtos
{
    public class FrameworkPagedAndSortedResultRequestDto : PagedAndSortedResultRequestDto
    {
        public string Search { get; set; }
        public SharedStatus? Status { get; set; }
        public FrameworkStatus? FrameworkStatus { get; set; }
        
    }

    public class getFrameworkDto
    {
        public Guid FrameworkId { get; set; }
    }
}
