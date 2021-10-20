using System;
using System.Collections.Generic;
using System.Text;
using RMG.ComplianceSystem.Localization;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem
{
    /* Inherit your application services from this class.
     */
    public abstract class ComplianceSystemAppService : ApplicationService
    {
        protected ComplianceSystemAppService()
        {
            LocalizationResource = typeof(ComplianceSystemResource);
        }
    }
}
