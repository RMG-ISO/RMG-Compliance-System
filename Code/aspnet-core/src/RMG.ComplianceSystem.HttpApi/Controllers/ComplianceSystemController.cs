using RMG.ComplianceSystem.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace RMG.ComplianceSystem.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class ComplianceSystemController : AbpController
    {
        protected ComplianceSystemController()
        {
            LocalizationResource = typeof(ComplianceSystemResource);
        }
    }
}