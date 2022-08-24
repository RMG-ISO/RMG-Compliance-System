using System.Linq;
using Microsoft.EntityFrameworkCore;
using RMG.ComplianceSystem.Documents;
using RMG.ComplianceSystem.Risks.Entity;

namespace RMG.ComplianceSystem.Risks 
{
    public static class RiskEfCoreQueryableExtensions
    {
        public static IQueryable<RiskOpportunity> IncludeDetails(this IQueryable<RiskOpportunity> queryable, bool include = true)
        {
            if (!include)
            {
                return queryable;
            }

            return queryable
                // .Include(x => x.xxx) // TODO: AbpHelper generated
                .Include(t=>t.RiskTreatment)
                .Include(t => t.Creator)
                .Include(t => t.LastModifier)
                .Include(t => t.Deleter)
                ;
        }
    }
}