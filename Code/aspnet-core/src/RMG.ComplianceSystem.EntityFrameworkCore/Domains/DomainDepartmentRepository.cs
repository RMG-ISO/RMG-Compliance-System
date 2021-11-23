using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Domains
{
    public class DomainDepartmentRepository : EfCoreRepository<ComplianceSystemDbContext, DomainDepartment>, IDomainDepartmentRepository
    {
        public DomainDepartmentRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<DomainDepartment>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<DomainDepartment> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}