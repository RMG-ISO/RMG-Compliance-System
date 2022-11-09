using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace RMG.ComplianceSystem.InternalAuditApproves
{
    public static class InternalAuditApproveEfCoreQueryableExtensions
    {
        public static IQueryable<InternalAuditApprove> IncludeDetails(this IQueryable<InternalAuditApprove> queryable, bool include = true)
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