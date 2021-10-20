using RMG.ComplianceSystem.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace RMG.ComplianceSystem
{
    [DependsOn(
        typeof(ComplianceSystemEntityFrameworkCoreTestModule)
        )]
    public class ComplianceSystemDomainTestModule : AbpModule
    {

    }
}