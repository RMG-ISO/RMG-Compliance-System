using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Documents
{
    public static class DocumentEfCoreQueryableExtensions
    {
        public static IQueryable<Document> IncludeDetails(this IQueryable<Document> queryable, bool include = true)
        {
            if (!include)
            {
                return queryable;
            }

            return queryable
                // .Include(x => x.xxx) // TODO: AbpHelper generated
                .Include(t => t.Approvers).ThenInclude(t => t.Employee)
                .Include(t => t.Owners).ThenInclude(t => t.Employee)
                .Include(t => t.Reviewers).ThenInclude(t => t.Employee)
                .Include(t => t.DocumentCategories).ThenInclude(t => t.Category)
                ;
        }
    }
}