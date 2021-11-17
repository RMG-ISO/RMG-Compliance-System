using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Controls
{
    public static class ControlEfCoreQueryableExtensions
    {
        public static IQueryable<Control> IncludeDetails(this IQueryable<Control> queryable, bool include = true)
        {
            if (!include)
            {
                return queryable;
            }

            return queryable
                 // .Include(x => x.xxx) // TODO: AbpHelper generated
                 .Include(t => t.Assessments).ThenInclude(t => t.Creator)
                 .Include(t => t.Assessments).ThenInclude(t => t.Deleter)
                 .Include(t => t.Assessments).ThenInclude(t => t.LastModifier)
                 .Include(t => t.Parent.Creator)
                 .Include(t => t.Parent.LastModifier)
                 .Include(t => t.Parent.Deleter)
                 .Include(t => t.Children).ThenInclude(t => t.Creator)
                 .Include(t => t.Children).ThenInclude(t => t.LastModifier)
                 .Include(t => t.Children).ThenInclude(t => t.Deleter)
                 .Include(t => t.Domain.Creator)
                 .Include(t => t.Domain.LastModifier)
                 .Include(t => t.Domain.Deleter)
                 .Include(t => t.Creator)
                 .Include(t => t.LastModifier)
                 .Include(t => t.Deleter)
                ;
        }
    }
}