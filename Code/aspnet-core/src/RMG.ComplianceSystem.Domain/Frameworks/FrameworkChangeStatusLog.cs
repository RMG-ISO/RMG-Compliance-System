using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.Frameworks
{
    public class FrameworkChangeStatusLog : CreationAuditedEntity<Guid>
    {
        public FrameworkStatus Status { get; set; }
        public string Comment { get; set; }
        public Guid FrameworkId { get; set; }
        public Framework Framework { get; set; }

        protected FrameworkChangeStatusLog() { }

        public FrameworkChangeStatusLog(Guid id, FrameworkStatus status, Guid frameworkId, string comment = null)
        {
            Id = id;
            Status = status;
            Comment = comment;
            FrameworkId = frameworkId;
        }
    }
}
