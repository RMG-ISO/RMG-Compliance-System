using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Documents
{
    public class PrincipleRepository : EfCoreRepository<ComplianceSystemDbContext, Principle, Guid>, IPrincipleRepository
    {
        public PrincipleRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<Principle>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

    }
}