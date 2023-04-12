using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Frameworks.Dtos
{
    public class FrameworkEmployeePagedAndSortedResultRequestDto : PagedAndSortedResultRequestDto
    {
        public Guid FrameworkId { get; set; }
        public Guid EmployeeId { get; set; }


    }


}
