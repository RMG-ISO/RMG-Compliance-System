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
    public class HistoryRiskAndOpportunityRepository : EfCoreRepository<ComplianceSystemDbContext, HistoryRiskOpportunity, Guid>, IHistoryRiskAndOpportunityRepository
    {
        public HistoryRiskAndOpportunityRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<HistoryRiskOpportunity>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

     
    }
}