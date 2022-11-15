using System.Linq;
using Microsoft.EntityFrameworkCore;
using RMG.ComplianceSystem.InternalAuditRisks;
using RMG.ComplianceSystem.InternalAuditPreparations;

namespace RMG.ComplianceSystem.InternalAuditRisks
{
    public static class InternalAuditRiskEfCoreQueryableExtensions
    {
        public static IQueryable<InternalAuditRisk> IncludeDetails(this IQueryable<InternalAuditRisk> queryable, bool include = true)
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