using Volo.Abp.Modularity;

namespace RMG.ComplianceSystem
{
    [DependsOn(
        typeof(ComplianceSystemApplicationModule),
        typeof(ComplianceSystemDomainTestModule)
        )]
    public class ComplianceSystemApplicationTestModule : AbpModule
    {

    }
}