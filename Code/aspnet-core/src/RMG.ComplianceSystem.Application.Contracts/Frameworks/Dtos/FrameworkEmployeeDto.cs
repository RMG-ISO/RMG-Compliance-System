using RMG.ComplianceSystem.Attachments.Dtos;
using RMG.ComplianceSystem.Shared;
using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Frameworks.Dtos
{
    [Serializable]
    public class FrameworkEmployeeDto : FullAuditedEntityWithUserDto<Guid,IdentityUserDto>
    {
        public Guid FrameworkId { get; set; }
        public Guid EmployeeId { get; set; }


    }
}