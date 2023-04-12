using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Frameworks
{
    public class FrameworkEmployeeRepository : EfCoreRepository<ComplianceSystemDbContext, FrameworkEmployee, Guid>, IFrameworkEmployeeRepository
    {
        public FrameworkEmployeeRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<FrameworkEmployee>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<FrameworkEmployee> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}