using RMG.ComplianceSystem.EntityFrameworkCore;
using RMG.ComplianceSystem.InternalAuditPreparations;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.InternalAuditRisks
{
    public class InternalAuditRiskRepository : EfCoreRepository<ComplianceSystemDbContext, InternalAuditRisk, Guid>, IInternalAuditRiskRepository
    {
        public InternalAuditRiskRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<InternalAuditRisk>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<InternalAuditRisk> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}