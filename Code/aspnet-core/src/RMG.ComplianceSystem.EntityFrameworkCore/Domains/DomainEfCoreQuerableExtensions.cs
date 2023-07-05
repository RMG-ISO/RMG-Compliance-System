using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Domains
{
    public static class DomainEfCoreQueryableExtensions
    {
        public static IQueryable<Domain> IncludeDetails(this IQueryable<Domain> queryable, bool include = true)
        {
            if (!include)
            {
                return queryable;
            }

            return queryable
                 // .Include(x => x.xxx) // TODO: AbpHelper generated
                 .Include(t => t.Controls).ThenInclude(t => t.Creator)
                .Include(t => t.Controls).ThenInclude(t => t.LastModifier)
                .Include(t => t.Controls).ThenInclude(t => t.Deleter)
                .Include(t => t.Responsible)

                .Include(t => t.DomainDepartments).ThenInclude(t=>t.Department.Creator)
                .Include(t => t.DomainDepartments).ThenInclude(t=>t.Department.LastModifier)
                .Include(t => t.DomainDepartments).ThenInclude(t=>t.Department.Deleter)
                .Include(t => t.Framework)
                .Include(t => t.Framework.Creator)
                .Include(t => t.Framework.LastModifier)
                .Include(t => t.Framework.Deleter)
                .Include(t => t.Parent)
                .Include(t => t.Parent.Creator)
                .Include(t => t.Parent.LastModifier)
                .Include(t => t.Parent.Deleter)
                .Include(t => t.Children).ThenInclude(t => t.Creator)
                .Include(t => t.Children).ThenInclude(t => t.LastModifier)
                .Include(t => t.Children).ThenInclude(t => t.Deleter)
                .Include(t => t.Creator)
                .Include(t => t.LastModifier)
                .Include(t => t.Deleter)
                ;
        }
    }
}