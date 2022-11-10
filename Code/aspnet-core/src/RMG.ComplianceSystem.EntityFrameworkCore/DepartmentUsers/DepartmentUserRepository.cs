using RMG.ComplianceSystem.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.DepartmentUsers
{
    public class DepartmentUserRepository : EfCoreRepository<ComplianceSystemDbContext, DepartmentUser, Guid>, IDepartmentUserRepository
    {
        public DepartmentUserRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<DepartmentUser>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<DepartmentUser> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}