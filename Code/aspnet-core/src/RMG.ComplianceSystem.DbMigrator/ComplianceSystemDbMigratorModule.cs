using RMG.ComplianceSystem.EntityFrameworkCore;
using RMG.ComplianceSystem.Subscription;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace RMG.ComplianceSystem.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(ComplianceSystemEntityFrameworkCoreModule),
        typeof(ComplianceSystemApplicationContractsModule),
        typeof(ComplianceSystemSubscriptionModule)
        )]
    public class ComplianceSystemDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
