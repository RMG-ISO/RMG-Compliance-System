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
            var builder = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../RMG.ComplianceSystem.DbMigrator/"))
                .AddJsonFile("appsettings.json", optional: false);

            return builder.Build();
        }
    }
}
