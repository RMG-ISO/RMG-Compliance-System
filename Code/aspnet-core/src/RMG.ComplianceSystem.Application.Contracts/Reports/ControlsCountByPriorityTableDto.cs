using RMG.ComplianceSystem.Assessments;
using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Text;

namespace RMG.ComplianceSystem.Reports
{
    public class ControlsCountByPriorityTableDto
    {
        public PriorityType Priority { get; set; }
        public int ControlsCount { get; set; }
        public int PercentageOfTotal { get; set; }
        public int DocumentedCount { get; set; }
        public int DocumentedPercentage { get; set; }
        public int ImplementedCount { get; set; }
        public int ImplementedPercentage { get; set; }
        public int EffectiveCount { get; set; }
        public int EffectivePercentage { get; set; }
    }
}
