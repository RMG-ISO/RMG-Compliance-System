using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace RMG.ComplianceSystem
{
    [Dependency(ReplaceServices = true)]
    public class ComplianceSystemBrandingProvider : DefaultBrandingProvider
    {
        public override string AppName => "ComplianceSystem";
    }
}
