using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Policies
{
    public class PolicyApprover : FullAuditedAggregateRootWithUser<Guid, IdentityUser>
    {

        public Guid PolicyId { get; set; }
        public Guid EmployeeId { get; set; }
        protected PolicyApprover()
        {

        }

        public PolicyApprover(
            Guid policyid,
          Guid employeeId
        )
        {
            PolicyId = policyid;
            EmployeeId = employeeId;
        }
    }
}
