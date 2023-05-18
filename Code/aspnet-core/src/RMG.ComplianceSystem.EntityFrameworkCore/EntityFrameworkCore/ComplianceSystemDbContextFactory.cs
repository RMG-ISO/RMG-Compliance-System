using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace RMG.ComplianceSystem.EntityFrameworkCore
{
    /* This class is needed for EF Core console commands
     * (like Add-Migration and Update-Database commands) */
    public class ComplianceSystemDbContextFactory : IDesignTimeDbContextFactory<ComplianceSystemDbContext>
    {
        public ComplianceSystemDbContext CreateDbContext(string[] args)
        {
            ComplianceSystemEfCoreEntityExtensionMappings.Configure();

            var configuration = BuildConfiguration();

            var builder = new DbContextOptionsBuilder<ComplianceSystemDbContext>()
                .UseSqlServer(configuration.GetConnectionString("Default"));

            return new ComplianceSystemDbContext(builder.Options);
        }

        private static IConfigurationRoot BuildConfiguration()
        {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            var jsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), "../RMG.ComplianceSystem.DbMigrator/");
            var jsonFileName = "appsettings.json";
            if (env == "Development" && File.Exists(Path.Combine(jsonFilePath, $"appsettings.{env}.json")))
                jsonFileName = "appsettings.Development.json";

            var builder = new ConfigurationBuilder()
                .SetBasePath(jsonFilePath)
                .AddJsonFile(jsonFileName, optional: false);

            return builder.Build();
        }
    }
}
