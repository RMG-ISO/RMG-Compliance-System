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
                ;
        }
    }
}