using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.EntityFrameworkCore;
using RMG.ComplianceSystem.InternalAuditQuestionLists;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.InternalAuditMenuQuestions
{
    public class InternalAuditMenuQuestionRepository : EfCoreRepository<ComplianceSystemDbContext, InternalAuditMenuQuestion, Guid>, IInternalAuditMenuQuestionRepository
    {
        public InternalAuditMenuQuestionRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<InternalAuditMenuQuestion>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<InternalAuditMenuQuestion> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}