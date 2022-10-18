using RMG.ComplianceSystem.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.InternalAuditQuestions
{
    public class InternalAuditQuestionRepository : EfCoreRepository<ComplianceSystemDbContext, InternalAuditQuestion, Guid>, IInternalAuditQuestionRepository
    {
        public InternalAuditQuestionRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<InternalAuditQuestion>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<InternalAuditQuestion> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}