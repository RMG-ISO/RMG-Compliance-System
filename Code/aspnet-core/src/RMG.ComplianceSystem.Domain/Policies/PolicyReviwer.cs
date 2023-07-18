using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Policies
{
    public class PolicyReviwer : FullAuditedAggregateRootWithUser<Guid, IdentityUser>
    {
        public Guid PolicyId { get; set; }
        public Guid EmployeeId { get; set; }

        protected PolicyReviwer()
        {

        }

        public PolicyReviwer(Guid policyId, Guid employeeId)
        {
            PolicyId = policyId;
            EmployeeId = employeeId;
        }
    }
}
