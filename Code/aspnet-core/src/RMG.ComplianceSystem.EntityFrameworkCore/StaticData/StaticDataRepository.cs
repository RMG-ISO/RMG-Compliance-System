using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.StaticData
{
    public class StaticDataRepository : EfCoreRepository<ComplianceSystemDbContext, StaticDatatb, Guid>, IStaticDataRepository
    {
        public StaticDataRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<StaticDatatb>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<StaticDatatb> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}