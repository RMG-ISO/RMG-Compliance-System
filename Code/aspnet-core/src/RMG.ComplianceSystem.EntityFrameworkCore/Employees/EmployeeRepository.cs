using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Employees
{
    public class EmployeeRepository : EfCoreRepository<ComplianceSystemDbContext, Employee, Guid>, IEmployeeRepository
    {
        public EmployeeRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }


        public override async Task<IQueryable<Employee>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<Employee> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}