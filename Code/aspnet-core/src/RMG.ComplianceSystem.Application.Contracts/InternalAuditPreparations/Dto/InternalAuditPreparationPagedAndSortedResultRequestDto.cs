using System;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.InternalAuditPreparation.Dto
{
    public class InternalAuditPreparationPagedAndSortedResultRequestDto : PagedAndSortedResultRequestDto
    {
        public string Search { get; set; }
        public Guid? FrameworkId { get; set; }
        public Guid? DepartmentId { get; set; }
    }
    
}
