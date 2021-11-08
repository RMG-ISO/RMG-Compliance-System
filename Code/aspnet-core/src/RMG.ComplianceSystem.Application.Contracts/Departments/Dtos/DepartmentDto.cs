using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Departments.Dtos
{
    [Serializable]
    public class DepartmentDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public string Name { get; set; }

    }
}