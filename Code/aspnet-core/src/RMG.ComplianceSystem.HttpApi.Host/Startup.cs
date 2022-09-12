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

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            
            app.InitializeApplication();
            app.Use(async (context, next) =>
            {
              var AccessToken= context.Request.Query["access-token"];
                var path = context.Request.Path;
                if (!string.IsNullOrEmpty(AccessToken)&&(path.StartsWithSegments("/signalr-hubs/notification-hub")))
                {
                    context.Request.Headers["Authorization"] = "Bearer " + AccessToken;
                }
                await next();
            });

        }
    }
}
