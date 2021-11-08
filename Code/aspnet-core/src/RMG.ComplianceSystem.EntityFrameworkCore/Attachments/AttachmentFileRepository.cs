using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Attachments
{
    public class AttachmentFileRepository : EfCoreRepository<ComplianceSystemDbContext, AttachmentFile, Guid>, IAttachmentFileRepository
    {
        public AttachmentFileRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<AttachmentFile>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<AttachmentFile> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }


    }
}