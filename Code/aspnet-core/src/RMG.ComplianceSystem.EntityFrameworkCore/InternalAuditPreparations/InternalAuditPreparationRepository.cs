using RMG.ComplianceSystem.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.InternalAuditPreparations
{
    public class InternalAuditPreparationRepository : EfCoreRepository<ComplianceSystemDbContext, InternalAuditPreparation, Guid>, IInternalAuditPreparationRepository
    {
        public InternalAuditPreparationRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<InternalAuditPreparation>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<InternalAuditPreparation> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}