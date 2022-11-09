using System.Linq;
using Microsoft.EntityFrameworkCore;
using RMG.ComplianceSystem.DepartmentUsers;

namespace RMG.ComplianceSystem.DepartmentUsers
{
    public static class DepartmentUserEfCoreQueryableExtensions
    {
        public static IQueryable<DepartmentUser> IncludeDetails(this IQueryable<DepartmentUser> queryable, bool include = true)
        {
            if (!include)
            {
                return queryable;
            }

            return queryable
                 // .Include(x => x.xxx) // TODO: AbpHelper generated

                .Include(t => t.Creator)
                .Include(t => t.LastModifier)
                .Include(t => t.Deleter)
                ;
        }
    }
}