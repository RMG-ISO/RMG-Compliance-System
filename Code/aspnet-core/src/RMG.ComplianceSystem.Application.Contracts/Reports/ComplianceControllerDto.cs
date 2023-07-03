using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Reports
{
    public class ComplianceControllerDto
    {
        public string DomainName { get; set; }
        public int ControllersCount { get; set; }
        public int ComplianceCount { get; set; }
    }
}
