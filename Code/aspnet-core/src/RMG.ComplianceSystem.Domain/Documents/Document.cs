using JetBrains.Annotations;
using RMG.ComplianceSystem.Documents.Dtos;
using RMG.ComplianceSystem.Employees;
using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.Documents
{
    public class Document : FullAuditedAggregateRoot<Guid>
    {
        [NotNull]
        public string Code { get; set; }
        [NotNull]
        public string Name { get; set; }
        public DocumentType Type { get; set; }

        public DateTime? ValidationStartDate { get; set; }
        public DateTime? ValidationEndtDate { get; set; }


        [Range(0, 100)]
        public int CompliancePercentage { get; set; }
        public DocumentStatus Status { get; set; }
        [NotNull]
        public string Description { get; set; }

        public Guid? ComplianceResponsibleId { get; set; }
        public Employee ComplianceResponsible { get; set; }

        public DateTime? ComplianceScheduledStartDate { get; set; }
        public DateTime? ComplianceScheduledEndDate { get; set; }

        public DateTime? ComplianceStartDate { get; set; }
        public DateTime? ComplianceEndDate { get; set; }

        public virtual ICollection<DocumentOwner> Owners { get; set; } = new List<DocumentOwner>();
        public virtual ICollection<DocumentReviewer> Reviewers { get; set; } = new List<DocumentReviewer>();
        public virtual ICollection<DocumentApprover> Approvers { get; set; } = new HashSet<DocumentApprover>();

        public virtual ICollection<DocumentCategory> DocumentCategories { get; set; } = new HashSet<DocumentCategory>();
        public virtual ICollection<DocumentActionLog> ActionsLog { get; set; } = new HashSet<DocumentActionLog>();

    }
}
