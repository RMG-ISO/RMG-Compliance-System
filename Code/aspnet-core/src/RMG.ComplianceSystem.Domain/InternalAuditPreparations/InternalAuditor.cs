using RMG.ComplianceSystem.Departments;
using RMG.ComplianceSystem.InternalAuditQuestionLists;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.InternalAuditPreparations
{
    public class InternalAuditor : FullAuditedAggregateRootWithUser<Guid, IdentityUser>
    {
        public Guid InternalAuditPreparationId { get; set; }
        public Guid UserId { get; set; }
        public Guid? DepartmentId { get; set; }
        public Boolean IsAuditor { get; set; } = false;




        protected InternalAuditor()
        {
        }

        public InternalAuditor(
            Guid internalAuditPreparationId,
            Guid userId,
            Guid? departmentId,
            Boolean isAuditor
        )
        {
            InternalAuditPreparationId = internalAuditPreparationId;
            UserId = userId;
            DepartmentId = departmentId;
            IsAuditor = isAuditor;

        }



    }
}
