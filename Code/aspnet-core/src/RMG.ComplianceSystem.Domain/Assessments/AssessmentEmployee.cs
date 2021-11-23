using RMG.ComplianceSystem.Employees;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;

namespace RMG.ComplianceSystem.Assessments
{
   public class AssessmentEmployee: Entity
    {
        public Guid AssessmentId { get; set; }
        public Guid EmployeeId { get; set; }

        public virtual Assessment Assessment { get; set; }
        public virtual Employee Employee { get; set; }

        public override object[] GetKeys()
        {
            return new object[] { AssessmentId, EmployeeId };
        }

        protected AssessmentEmployee()
        {
        }

        public AssessmentEmployee(
            Guid assessmentId,
            Guid employeeId
        )
        {
            AssessmentId = assessmentId;
            EmployeeId = employeeId;
        }

        public AssessmentEmployee(
            Guid employeeId
        )
        {
            EmployeeId = employeeId;
        }
    }
}
