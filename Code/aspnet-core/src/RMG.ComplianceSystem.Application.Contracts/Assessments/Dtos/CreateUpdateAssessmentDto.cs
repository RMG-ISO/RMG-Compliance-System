using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace RMG.ComplianceSystem.Assessments.Dtos
{
    [Serializable]
    public class CreateUpdateAssessmentDto
    {
        public Guid ControlId { get; set; }

        public ApplicableType? Applicable { get; set; }

        public ComplianceLevelType? ComplianceLevel { get; set; }

        public DateTime? ComplianceDate { get; set; }

        public DateTime? NextComplianceDate { get; set; }

        public DocumentedType? Documented { get; set; }

        public ImplementedType? Implemented { get; set; }

        public EffectiveType? Effective { get; set; }

        [Range(1, 100)]
        public int? DocumentedPercentage { get; set; }
        [Range(1, 100)]
        public int? ImplementedPercentage { get; set; }
        [Range(1, 100)]
        public int? EffectivePercentage { get; set; }

        public string Comment { get; set; }

        public Guid? AttachmentId { get; set; }

        public List<Guid> EmployeeIds { get; set; }

    }
}