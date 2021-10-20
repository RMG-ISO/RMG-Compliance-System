using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace RMG.ComplianceSystem.Data
{
    /* This is used if database provider does't define
     * IComplianceSystemDbSchemaMigrator implementation.
     */
    public class NullComplianceSystemDbSchemaMigrator : IComplianceSystemDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}