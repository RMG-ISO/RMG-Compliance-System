using RMG.ComplianceSystem.Employees;
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
    public class PolicyOwner : AuditedEntity<Guid>
    {
        public Guid PolicyId { get; set; }
        public Guid EmployeeId { get; set; }
        [ForeignKey(nameof(EmployeeId))]
        public virtual Employee Employee { get; set; }

        protected PolicyOwner()
        {
            
        }

        public PolicyOwner (Guid policyId, Guid employeeId)
        {
            this.Id = Guid.NewGuid();
            PolicyId = policyId;
            EmployeeId = employeeId;
        }
    }
}
