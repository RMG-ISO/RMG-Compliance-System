using System.Threading.Tasks;

namespace RMG.ComplianceSystem.Data
{
    public interface IComplianceSystemDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
