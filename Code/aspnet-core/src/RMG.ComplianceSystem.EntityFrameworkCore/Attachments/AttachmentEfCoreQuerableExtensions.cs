using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Attachments
{
    public static class AttachmentEfCoreQueryableExtensions
    {
        public static IQueryable<Attachment> IncludeDetails(this IQueryable<Attachment> queryable, bool include = true)
        {
            if (!include)
            {
                return queryable;
            }

            return queryable
                // .Include(x => x.xxx) // TODO: AbpHelper generated
                .Include(t => t.AttachmentFiles).ThenInclude(t=>t.Creator)
                .Include(t => t.AttachmentFiles).ThenInclude(t=>t.LastModifier)
                .Include(t => t.AttachmentFiles).ThenInclude(t=>t.Deleter)
                .Include(t => t.Creator)
                .Include(t => t.LastModifier)
                .Include(t => t.Deleter)
                ;
        }
    }
}