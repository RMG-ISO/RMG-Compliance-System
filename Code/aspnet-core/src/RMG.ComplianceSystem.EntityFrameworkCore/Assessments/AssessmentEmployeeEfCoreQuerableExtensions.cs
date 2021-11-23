using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Assessments
{
    public static class AssessmentEmployeeEfCoreQueryableExtensions
    {
        public static IQueryable<AssessmentEmployee> IncludeDetails(this IQueryable<AssessmentEmployee> queryable, bool include = true)
        {
            if (!include)
            {
                return queryable;
            }

            return queryable
                // .Include(x => x.xxx) // TODO: AbpHelper generated
                ;
        }
    }
}