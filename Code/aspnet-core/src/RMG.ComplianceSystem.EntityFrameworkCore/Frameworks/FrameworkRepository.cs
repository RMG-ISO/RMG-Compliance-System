using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Frameworks
{
    public class FrameworkRepository : EfCoreRepository<ComplianceSystemDbContext, Framework, Guid>, IFrameworkRepository
    {
        public FrameworkRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<Framework>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<Framework> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}