using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Assessments.Dtos
{
    public class AssessmentCompliancePercentageDto
    {
        public int? DocumentedPercentage { get; set; }
        public int? ImplementedPercentage { get; set; }
        public int? EffectivePercentage { get; set; }

        public int CompliancePercentage
        {
            get
            {
                return (EffectivePercentage.Value + ImplementedPercentage.Value + DocumentedPercentage.Value) / 3;
            }
        }
    }
}
