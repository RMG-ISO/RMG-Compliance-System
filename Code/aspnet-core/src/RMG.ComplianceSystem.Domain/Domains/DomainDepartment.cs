using RMG.ComplianceSystem.Departments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;

namespace RMG.ComplianceSystem.Domains
{
    public class DomainDepartment : Entity
    {
        public Guid DomainId { get; set; }
        public Guid DepartmentId { get; set; }

        public virtual Domain Domain { get; set; }
        public virtual Department Department { get; set; }

        public override object[] GetKeys()
        {
            return new object[] { DomainId, DepartmentId };
        }

        protected DomainDepartment()
        {
        }

        public DomainDepartment(
            Guid domainId,
            Guid departmentId
        )
        {
            DomainId = domainId;
            DepartmentId = departmentId;
        }

        public DomainDepartment(
           Guid departmentId
       )
        {
            DepartmentId = departmentId;
        }
    }
}
