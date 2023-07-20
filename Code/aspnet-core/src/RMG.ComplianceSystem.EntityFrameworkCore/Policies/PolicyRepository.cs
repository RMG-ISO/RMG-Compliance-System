using Microsoft.EntityFrameworkCore;
using RMG.ComplianceSystem.EntityFrameworkCore;
using RMG.ComplianceSystem.Policies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Policies
{
    public class PolicyRepository : EfCoreRepository<ComplianceSystemDbContext, Policy, Guid> , IPolicyRepository
    {
        public PolicyRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<Policy>> WithDetailsAsync()
        {
            return (await GetQueryableAsync())
                .Include(x => x.Owners)
                .Include(x => x.Approvers)
                .Include(x => x.Reviewers)
                .Include(x => x.PolicyCategories);
        }
    }
}
