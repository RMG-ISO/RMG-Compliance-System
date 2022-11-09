using System;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.DepartmentUsers
{
    public class DepartmentUser : FullAuditedAggregateRootWithUser<Guid, IdentityUser>
    {
        public Guid DepartmentId { get; set; }
        public Guid UserId { get; set; }

    }
}
