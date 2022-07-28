using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Documents;
using RMG.ComplianceSystem.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Documents
{
    public class DocumentCategoryRepository : EfCoreRepository<ComplianceSystemDbContext, DocumentCategory, Guid>, IDocumentCategoryRepository
    {
        public DocumentCategoryRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<DocumentCategory>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<DocumentCategory> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}