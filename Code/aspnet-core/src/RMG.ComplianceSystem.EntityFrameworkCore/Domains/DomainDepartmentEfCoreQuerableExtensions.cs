using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Domains
{
    public static class DomainDepartmentEfCoreQueryableExtensions
    {
        public static IQueryable<DomainDepartment> IncludeDetails(this IQueryable<DomainDepartment> queryable, bool include = true)
        {
            if (!include)
            {
                return queryable;
            }

            return queryable
                // .Include(x => x.xxx) // TODO: AbpHelper generated
                ;
        }
    }
}