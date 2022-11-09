using RMG.ComplianceSystem.Attachments.Dtos;
using RMG.ComplianceSystem.Departments.Dtos;
using RMG.ComplianceSystem.Frameworks.Dtos;
using RMG.ComplianceSystem.Risks.Dtos;
using RMG.ComplianceSystem.RiskTreatments;
using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.DepartmentUsers
{
    [Serializable]
    public class DepartmentUserDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public Guid DepartmentId { get; set; }
        public Guid UserId { get; set; }

    }



}
