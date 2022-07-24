using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Policies
{
    public static class PolicyEfCoreQueryableExtensions
    {
        public static IQueryable<Policy> IncludeDetails(this IQueryable<Policy> queryable, bool include = true)
        {
            if (!include)
            {
                return queryable;
            }

            return queryable
                // .Include(x => x.xxx) // TODO: AbpHelper generated
                .Include(t => t.Attachment).ThenInclude(t=>t.Creator)
                .Include(t => t.Attachment).ThenInclude(t=>t.LastModifier)
                .Include(t => t.Attachment).ThenInclude(t=>t.Deleter)
                .Include(t => t.Creator)
                .Include(t => t.LastModifier)
                .Include(t => t.Deleter)
                ;
        }
    }
}