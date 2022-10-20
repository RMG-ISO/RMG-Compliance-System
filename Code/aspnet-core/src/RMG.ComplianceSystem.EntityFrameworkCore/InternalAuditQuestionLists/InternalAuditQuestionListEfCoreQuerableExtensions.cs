using System.Linq;
using Microsoft.EntityFrameworkCore;
using RMG.ComplianceSystem.InternalAuditQuestionLists;

namespace RMG.ComplianceSystem.InternalAuditQuestionLists
{
    public static class InternalAuditQuestionListEfCoreQueryableExtensions
    {
        public static IQueryable<InternalAuditQuestionList> IncludeDetails(this IQueryable<InternalAuditQuestionList> queryable, bool include = true)
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