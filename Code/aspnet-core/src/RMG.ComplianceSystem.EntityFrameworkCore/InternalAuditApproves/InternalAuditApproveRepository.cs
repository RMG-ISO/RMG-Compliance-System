using RMG.ComplianceSystem.EntityFrameworkCore;
using RMG.ComplianceSystem.InternalAuditPreparations;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.InternalAuditApproves
{
    public class InternalAuditApproveRepository : EfCoreRepository<ComplianceSystemDbContext, InternalAuditApprove, Guid>, IInternalAuditApproveRepository
    {
        public InternalAuditApproveRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<InternalAuditApprove>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<InternalAuditApprove> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}