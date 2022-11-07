using RMG.ComplianceSystem.EntityFrameworkCore;
using RMG.ComplianceSystem.InternalAuditPreparations;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.InternalAuditors
{
    public class InternalAuditorRepository : EfCoreRepository<ComplianceSystemDbContext, InternalAuditor, Guid>, IInternalAuditorRepository
    {
        public InternalAuditorRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<InternalAuditor>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<InternalAuditor> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}