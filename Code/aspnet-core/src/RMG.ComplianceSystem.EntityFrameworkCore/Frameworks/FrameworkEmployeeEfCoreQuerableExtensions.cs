using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Frameworks
{
    public static class FrameworkEmployeeEfCoreQuerableExtensions

    {
        public static IQueryable<FrameworkEmployee> IncludeDetails(this IQueryable<FrameworkEmployee> queryable, bool include = true)
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