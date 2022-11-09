using System;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.DepartmentUsers
{
    public class DepartmentUserPagedAndSortedResultRequestDto : PagedAndSortedResultRequestDto
    {
        public Guid DepartmentId { get; set; }
        public Guid UserId { get; set; }
    }
    
}
