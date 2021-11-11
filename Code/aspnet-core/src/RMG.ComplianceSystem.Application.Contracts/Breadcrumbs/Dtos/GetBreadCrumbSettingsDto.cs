using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Breadcrumbs.Dtos
{
   public class GetBreadCrumbSettingsDto
    {
        public BreadCrumbSettingsType Type { get; set; }
        public Guid Id { get; set; }
    }
}
