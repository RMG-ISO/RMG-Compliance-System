using System.Linq;
using Microsoft.EntityFrameworkCore;
using RMG.ComplianceSystem.InternalAuditPreparations;

namespace RMG.ComplianceSystem.InternalAuditPreparations
{
    public static class InternalAuditPreparationEfCoreQueryableExtensions
    {
        public static IQueryable<InternalAuditPreparation> IncludeDetails(this IQueryable<InternalAuditPreparation> queryable, bool include = true)
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