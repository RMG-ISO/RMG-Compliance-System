using System.Linq;
using Microsoft.EntityFrameworkCore;
using RMG.ComplianceSystem.InternalAuditQuestions;

namespace RMG.ComplianceSystem.InternalAuditQuestions
{
    public static class InternalAuditQuestionEfCoreQueryableExtensions
    {
        public static IQueryable<InternalAuditQuestion> IncludeDetails(this IQueryable<InternalAuditQuestion> queryable, bool include = true)
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