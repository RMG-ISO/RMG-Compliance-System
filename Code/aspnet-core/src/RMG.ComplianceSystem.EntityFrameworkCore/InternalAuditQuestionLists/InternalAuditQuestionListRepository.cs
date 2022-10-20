using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.InternalAuditQuestionLists
{
    public class InternalAuditQuestionListRepository : EfCoreRepository<ComplianceSystemDbContext, InternalAuditQuestionList, Guid>, IInternalAuditQuestionListRepository
    {
        public InternalAuditQuestionListRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<InternalAuditQuestionList>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<InternalAuditQuestionList> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}