using RMG.ComplianceSystem.Assessments;
using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Reports
{
    public class CompliancePriorityTableDto
    {
        public PriorityType Priority { get; set; }
        public List<ComplianceControllerDto> Domains { get; set; }
    }
}
