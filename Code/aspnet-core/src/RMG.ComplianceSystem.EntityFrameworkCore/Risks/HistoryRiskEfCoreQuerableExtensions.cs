using System.Linq;
using Microsoft.EntityFrameworkCore;
using RMG.ComplianceSystem.Documents;
using RMG.ComplianceSystem.Risks.Entity;

namespace RMG.ComplianceSystem.Risks
{
    public static class HistoryRiskEfCoreQuerableExtensions
    {
        public static IQueryable<HistoryRiskOpportunity> IncludeDetails(this IQueryable<HistoryRiskOpportunity> queryable, bool include = true)
        {
                return queryable;
          
        }
    }
}