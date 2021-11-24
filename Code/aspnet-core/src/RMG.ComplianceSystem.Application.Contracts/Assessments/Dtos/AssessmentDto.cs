using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Assessments.Dtos
{
    [Serializable]
    public class AssessmentDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public Guid ControlId { get; set; }

        public ApplicableType? Applicable { get; set; }

        public ComplianceLevelType? ComplianceLevel { get; set; }

        public DateTime? ComplianceDate { get; set; }

        public DateTime? NextComplianceDate { get; set; }

        public DocumentedType? Documented { get; set; }

        public ImplementedType? Implemented { get; set; }

        public EffectiveType? Effective { get; set; }

        public string Comment { get; set; }

        public Guid? AttachmentId { get; set; }

        public List<NameId<Guid>> Employees { get; set; }

    }
}