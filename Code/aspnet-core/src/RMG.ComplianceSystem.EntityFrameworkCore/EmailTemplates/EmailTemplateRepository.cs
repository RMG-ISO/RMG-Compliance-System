using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.EmailTemplates
{
    public class EmailTemplateRepository : EfCoreRepository<ComplianceSystemDbContext, EmailTemplate, Guid>, IEmailTemplateRepository
    {
        public EmailTemplateRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<EmailTemplate>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<EmailTemplate> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}
