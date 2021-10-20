using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RMG.ComplianceSystem.Data;
using Volo.Abp.DependencyInjection;

namespace RMG.ComplianceSystem.EntityFrameworkCore
{
    public class EntityFrameworkCoreComplianceSystemDbSchemaMigrator
        : IComplianceSystemDbSchemaMigrator, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public EntityFrameworkCoreComplianceSystemDbSchemaMigrator(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task MigrateAsync()
        {
            /* We intentionally resolving the ComplianceSystemDbContext
             * from IServiceProvider (instead of directly injecting it)
             * to properly get the connection string of the current tenant in the
             * current scope.
             */

            await _serviceProvider
                .GetRequiredService<ComplianceSystemDbContext>()
                .Database
                .MigrateAsync();
        }
    }
}
