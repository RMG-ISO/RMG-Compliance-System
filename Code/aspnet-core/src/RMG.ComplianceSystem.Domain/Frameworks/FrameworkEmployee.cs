using RMG.ComplianceSystem.Attachments;
using RMG.ComplianceSystem.Domains;
using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Frameworks
{
    public class FrameworkEmployee : FullAuditedAggregateRootWithUser<Guid, IdentityUser>
    {

        public Guid FrameworkId { get; set; }
        public Guid EmployeeId { get; set; }

        protected FrameworkEmployee()
        {
            
    }

        public FrameworkEmployee(   
            Guid frameworkId,
          Guid employeeId
        )
        {
           FrameworkId= frameworkId;
            EmployeeId= employeeId; 
        }
    }
}
