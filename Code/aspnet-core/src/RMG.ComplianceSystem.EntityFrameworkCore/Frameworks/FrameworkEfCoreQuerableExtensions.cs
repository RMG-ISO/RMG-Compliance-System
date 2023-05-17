using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Frameworks
{
    public static class FrameworkEfCoreQueryableExtensions
    {
        public static IQueryable<Framework> IncludeDetails(this IQueryable<Framework> queryable, bool include = true)
        {
            if (!include)
            {
                return queryable;
            }

            return queryable
                 // .Include(x => x.xxx) // TODO: AbpHelper generated

                .Include(t => t.ChangeStatusLogs)
                .Include(t => t.Creator)
                .Include(t => t.LastModifier)
                .Include(t => t.Deleter)
                ;
        }
    }
}