using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Assessments
{
    public static class AssessmentEfCoreQueryableExtensions
    {
        public static IQueryable<Assessment> IncludeDetails(this IQueryable<Assessment> queryable, bool include = true)
        {
            if (!include)
            {
                return queryable;
            }

            return queryable
                 // .Include(x => x.xxx) // TODO: AbpHelper generated
                 .Include(t => t.AssessmentEmployees).ThenInclude(t=>t.Employee.Creator)
                 .Include(t => t.AssessmentEmployees).ThenInclude(t=>t.Employee.LastModifier)
                 .Include(t => t.AssessmentEmployees).ThenInclude(t=>t.Employee.Deleter)
                 .Include(t => t.Control.Creator)
                 .Include(t => t.Control.LastModifier)
                 .Include(t => t.Control.Deleter)
                 .Include(t => t.Creator)
                .Include(t => t.LastModifier)
                .Include(t => t.Deleter)
                ;
        }
    }
}