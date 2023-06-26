using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Reports
{
    public class ComplianceLevelTableDto
    {
        public string DomainName { get; set; }

        public int NotImplemented { get; set; }

        public int Intial { get; set; }
        public int Defined { get; set; }
        public int Effective { get; set; }
        public int Measurable { get; set; }

        public int Mature { get; set; }
    }
}
