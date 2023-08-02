using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Documents
{
    public static class PrincipleEfCoreQuerableExtensions
    {
        public static IQueryable<Principle> IncludeDetails(this IQueryable<Principle> queryable, bool include = true)
        {
            if (!include)
            {
                return queryable;
            }

            return queryable
                // .Include(x => x.xxx) // TODO: AbpHelper generated
                .Include(t => t.PrincipleControls).ThenInclude(t => t.Control)
                ;
        }
    }
}