using RMG.ComplianceSystem.Departments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Employees
{
    public class Employee : FullAuditedAggregateRootWithUser<Guid, IdentityUser>
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public Guid DepartmentId { get; set; }
        public bool IsManager { get; set; }

        public virtual Department Department { get; set; }

        protected Employee()
        {
        }

        public Employee(
            Guid id,
            string fullName,
            string email,
            Guid departmentId,
            bool isManager,
            Department department
        ) : base(id)
        {
            FullName = fullName;
            Email = email;
            DepartmentId = departmentId;
            IsManager = isManager;
            Department = department;
        }
    }
}
