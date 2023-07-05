using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Reports
{
    public class CompliancePhaseTableDto
    {
        public string DomainName { get; set; }
        public int DocumentedYes { get; set; }
        public int DocumentedPartially { get; set; }
        public int DocumentedNo { get; set; }
        public int ImplementedYes { get; set; }
        public int ImplementedNo { get; set; }
        public int ImplementedPartially { get; set; }
        public int EffectiveYes { get; set; }
        public int EffectiveNo { get; set; }
        public int EffectivePartially { get; set; }
    }
}
