using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Employees
{
    public static class EmployeeEfCoreQueryableExtensions
    {
        public static IQueryable<Employee> IncludeDetails(this IQueryable<Employee> queryable, bool include = true)
        {
            if (!include)
            {
                return queryable;
            }

            return queryable
                // .Include(x => x.xxx) // TODO: AbpHelper generated

                .Include(t => t.Department.Deleter)
                .Include(t => t.Department.Creator)
                .Include(t => t.Department.LastModifier)
                .Include(t => t.Creator)
                .Include(t => t.LastModifier)
                .Include(t => t.Deleter)
                ;
        }
    }
}