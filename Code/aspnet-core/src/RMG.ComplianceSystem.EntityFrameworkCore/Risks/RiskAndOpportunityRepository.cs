using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Risks;
using RMG.ComplianceSystem.EntityFrameworkCore;
using RMG.ComplianceSystem.Risks.Entity;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using RMG.ComplianceSystem.Risks.IRepository;

namespace RMG.ComplianceSystem.Risks
{
    public class RiskAndOpportunityRepository : EfCoreRepository<ComplianceSystemDbContext, RiskAndOpportunity, Guid>, IRiskAndOpportunityRepository
    {
        public RiskAndOpportunityRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<RiskAndOpportunity>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<RiskAndOpportunity> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}