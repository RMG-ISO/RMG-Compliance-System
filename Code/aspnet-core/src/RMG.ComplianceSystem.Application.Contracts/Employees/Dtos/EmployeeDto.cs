using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Employees.Dtos
{
    [Serializable]
    public class EmployeeDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public string FullName { get; set; }

        public string Email { get; set; }

        public Guid? DepartmentId { get; set; }

        public bool IsManager { get; set; }

        public bool IsUse { get; set; } 

        public string DepartmentName { get; set; }

    }
}