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
    public class DocumentOwner : CreationAuditedEntity<Guid>
    {
        public Guid DocumentId { get; set; }
        public Guid EmployeeId { get; set; }
        [ForeignKey(nameof(EmployeeId))]
        public virtual Employee Employee { get; set; }

        protected DocumentOwner()
        {

        }

        public DocumentOwner(
            Guid id, 
            Guid employeeId)
        {
            Id = id;
            EmployeeId = employeeId;
        }
    }
}
