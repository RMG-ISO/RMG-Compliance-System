using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RMG.ComplianceSystem.RiskTreatments
{
    public static class RiskTreatmentEfCoreQueryableExtensions
    {

        public static IQueryable<RiskTreatment> IncludeDetails(this IQueryable<RiskTreatment> queryable, bool include = true)
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
