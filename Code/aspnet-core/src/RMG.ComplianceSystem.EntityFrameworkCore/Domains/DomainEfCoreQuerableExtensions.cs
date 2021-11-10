using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Domains
{
    public static class DomainEfCoreQueryableExtensions
    {
        public static IQueryable<Domain> IncludeDetails(this IQueryable<Domain> queryable, bool include = true)
        {
            if (!include)
            {
                return queryable;
            }

            return queryable
                // .Include(x => x.xxx) // TODO: AbpHelper generated
                .Include(t => t.Department)
                .Include(t => t.Framework)
                .Include(t => t.Creator)
                .Include(t => t.LastModifier)
                .Include(t => t.Deleter)
                ;
        }
    }
}