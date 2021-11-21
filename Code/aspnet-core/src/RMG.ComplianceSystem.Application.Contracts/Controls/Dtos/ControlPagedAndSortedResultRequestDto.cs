using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Controls.Dtos
{
    public class ControlPagedAndSortedResultRequestDto : PagedAndSortedResultRequestDto
    {
        public Guid? MainControlId { get; set; }
        public bool IsMainControl { get; set; }
        public string Search { get; set; }
        public SharedStatus? Status { get; set; }
        public Guid? DomainId { get; set; }


    }
}
