using System.Linq;
using Microsoft.EntityFrameworkCore;
using RMG.ComplianceSystem.InternalAuditors;
using RMG.ComplianceSystem.InternalAuditPreparations;

namespace RMG.ComplianceSystem.InternalAuditors
{
    public static class InternalAuditorEfCoreQueryableExtensions
    {
        public static IQueryable<InternalAuditor> IncludeDetails(this IQueryable<InternalAuditor> queryable, bool include = true)
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