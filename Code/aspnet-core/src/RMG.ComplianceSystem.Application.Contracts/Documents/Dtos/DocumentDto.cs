using JetBrains.Annotations;
using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class DocumentDto : FullAuditedEntityDto<Guid>
    {
        public string LastModifierName { get; set; }
        public string CreatorName { get; set; }
        [NotNull]
        public string Code { get; set; }
        [NotNull]
        public string Name { get; set; }
        public DocumentType Type { get; set; }
        public IList<NameId<Guid>> Owners { get; set; }
        public IList<DocumentEmployeeDto> Reviewers { get; set; }
        public IList<DocumentEmployeeDto> Approvers { get; set; }

        public DateTime ValidationStartDate { get; set; }
        public DateTime ValidationEndtDate { get; set; }

        public Guid? ComplianceResponsibleId { get; set; }
        public string ComplianceResponsibleName { get; set; }

        public DateTime? ComplianceScheduledStartDate { get; set; }
        public DateTime? ComplianceScheduledEndDate { get; set; }

        public DateTime? ComplianceStartDate { get; set; }
        public DateTime? ComplianceEndDate { get; set; }

        [Range(0, 100)]
        public int CompliancePercentage { get; set; }
        public DocumentStatus Status { get; set; }
        [NotNull]
        public string Description { get; set; }


        public IList<NameId<Guid>> Categories { get; set; }
        public List<DocumentActionLogDto> ActionsLog { get; set; } = new List<DocumentActionLogDto>();
    }
}
