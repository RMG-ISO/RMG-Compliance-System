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
    public class RiskAndOpportunityRepository : EfCoreRepository<ComplianceSystemDbContext, RiskOpportunity, Guid>, IRiskAndOpportunityRepository
    {
        public RiskAndOpportunityRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<RiskOpportunity>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<RiskOpportunity> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}