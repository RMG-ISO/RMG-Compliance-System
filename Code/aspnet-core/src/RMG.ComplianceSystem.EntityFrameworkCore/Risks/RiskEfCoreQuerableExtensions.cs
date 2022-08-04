using System.Linq;
using Microsoft.EntityFrameworkCore;
using RMG.ComplianceSystem.Documents;
using RMG.ComplianceSystem.Risks.Entity;

namespace RMG.ComplianceSystem.Risks
{
    public static class RiskEfCoreQueryableExtensions
    {
        public static IQueryable<Risk> IncludeDetails(this IQueryable<Risk> queryable, bool include = true)
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