using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Attachments
{
    public class AttachmentRepository : EfCoreRepository<ComplianceSystemDbContext, Attachment, Guid>, IAttachmentRepository
    {
        public AttachmentRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<Attachment>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<Attachment> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}