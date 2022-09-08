using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Abp.AspNetCore.SignalR.Hubs;
using RMG.ComplianceSystem.DashBoards;

namespace RMG.ComplianceSystem
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplication<ComplianceSystemHttpApiHostModule>();

            services.AddTransient<Dashboard>();
            services.AddSignalR();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            
            app.InitializeApplication();
        }
    }
}
