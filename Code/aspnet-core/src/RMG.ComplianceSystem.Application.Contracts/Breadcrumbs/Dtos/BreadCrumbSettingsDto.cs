using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Breadcrumbs.Dtos
{
    public class BreadCrumbSettingsDto
    {
        public string FrameworkName { get; set; }
        public string FrameworkUrl { get; set; }
        public string DomainName { get; set; }
        public string DomainUrl { get; set; }
        public string SubDomainName { get; set; }
        public string SubDomainUrl { get; set; }
        public string ControlName { get; set; }
        public string ControlUrl { get; set; }
        public string SubControlName { get; set; }
        public string SubControlUrl { get; set; }
    }
}
