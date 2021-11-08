using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Attachments
{
    public static class AttachmentFileEfCoreQueryableExtensions
    {
        public static IQueryable<AttachmentFile> IncludeDetails(this IQueryable<AttachmentFile> queryable, bool include = true)
        {
            if (!include)
            {
                return queryable;
            }

            return queryable
                // .Include(x => x.xxx) // TODO: AbpHelper generated
                .Include(t => t.Attachment)
                .Include(t => t.Creator)
                .Include(t => t.LastModifier)
                .Include(t => t.Deleter)
                ;
        }
    }
}