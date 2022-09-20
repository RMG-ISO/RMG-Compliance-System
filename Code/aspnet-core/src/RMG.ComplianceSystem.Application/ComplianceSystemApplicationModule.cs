using RMG.ComplianceSystem.Notifications;
using Volo.Abp.Account;
using Volo.Abp.AspNetCore.SignalR;
using Volo.Abp.AutoMapper;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;
using Volo.Abp.TextTemplating;
using Volo.Abp.VirtualFileSystem;

namespace RMG.ComplianceSystem
{
    [DependsOn(
        typeof(ComplianceSystemDomainModule),
        typeof(AbpAccountApplicationModule),
        typeof(ComplianceSystemApplicationContractsModule),
        typeof(AbpIdentityApplicationModule),
        typeof(AbpPermissionManagementApplicationModule),
        typeof(AbpTenantManagementApplicationModule),
        typeof(AbpFeatureManagementApplicationModule),
        typeof(AbpSettingManagementApplicationModule),
        typeof(AbpTextTemplatingModule),
        typeof(AbpLocalizationModule)
        )]
    public class ComplianceSystemApplicationModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {

            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddMaps<ComplianceSystemApplicationModule>();
            });
            Configure<AbpVirtualFileSystemOptions>(options =>
            {
                options.FileSets.AddEmbedded<ComplianceSystemApplicationModule>("Compliance.ISO");
            });
            Configure<AbpSignalROptions>(options =>
            {
                options.Hubs.Add(
                    new HubConfig(
                        typeof(NotificationHub), //Hub type
                        "/signalr-hubs/notification-hub", //Hub route (URL)
                        hubOptions =>
                        {
                            //Additional options
                            //hubOptions.LongPolling.PollTimeout = TimeSpan.FromSeconds(30);
                        }
                    )
                );
            });
        }
    }
}
