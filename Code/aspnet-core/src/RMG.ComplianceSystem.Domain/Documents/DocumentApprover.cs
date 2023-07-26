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

namespace RMG.ComplianceSystem.Documents
{
    public class DocumentApprover : CreationAuditedEntity<Guid>
    {
        public bool IsRequired { get; set; }
        public Guid DocumentId { get; set; }
        public Guid EmployeeId { get; set; }
        [ForeignKey(nameof(EmployeeId))]
        public virtual Employee Employee { get; set; }
        protected DocumentApprover()
        {

        }

        public DocumentApprover(
            Guid id,
            Guid employeeId,
            bool isRequired
        )
        {
            Id = id;
            EmployeeId = employeeId;
            IsRequired = isRequired;
        }
    }
}
