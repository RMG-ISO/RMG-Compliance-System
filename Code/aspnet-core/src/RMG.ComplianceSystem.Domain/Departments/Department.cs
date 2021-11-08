using RMG.ComplianceSystem.Employees;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Departments
{
    public class Department : FullAuditedAggregateRootWithUser<Guid, IdentityUser>
    {
        public string Name { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }

        protected Department()
        {
        }

        public Department(
            Guid id,
            string name,
            ICollection<Employee> employees
        ) : base(id)
        {
            Name = name;
            Employees = employees;
        }
    }
}
