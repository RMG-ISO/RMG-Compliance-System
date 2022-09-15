using Microsoft.Extensions.DependencyInjection;
using RMG.ComplianceSystem.Notifications;
using System;
using Volo.Abp.Account;
using Volo.Abp.AspNetCore.SignalR;
using Volo.Abp.AutoMapper;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

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
        typeof(AbpAspNetCoreSignalRModule) 
        )]
    public class ComplianceSystemApplicationModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {

            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddMaps<ComplianceSystemApplicationModule>();
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
