using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;

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
            var rootPath = env.ContentRootPath;

            app.InitializeApplication();
            app.Use(async (httpContext, next) =>
            {
                var accessToken = httpContext.Request.Query["access_token"];

                var path = httpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) &&
                    (path.StartsWithSegments("/signalr-hubs/notification-hub")))
                {
                    httpContext.Request.Headers["Authorization"] = "Bearer " + accessToken;
                }

                await next();
            });

            app.UseStaticFiles(new StaticFileOptions()
            {
                RequestPath = "/logs",
                FileProvider = new PhysicalFileProvider(System.IO.Path.Combine(rootPath, "Logs"))
            });

        }
    }
}
