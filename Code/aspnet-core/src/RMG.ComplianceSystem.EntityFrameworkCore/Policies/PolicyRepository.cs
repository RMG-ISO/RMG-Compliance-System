using Microsoft.EntityFrameworkCore;
using RMG.ComplianceSystem.EntityFrameworkCore;
using RMG.ComplianceSystem.Policies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
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


        public async Task<(List<Policy>, int count)> GetListAsync(PolicyStatus? status, PolicyType? type, string sorting = null, int maxResultCount = int.MaxValue, int skipCount = 0, CancellationToken cancellationToken = default)
        {
            var query = await GetQueryableAsync();
            query = query.WhereIf(status.HasValue, x => x.Status == status.Value)
                         .WhereIf(type.HasValue, x => x.Type == type.Value)
                         .Include(x => x.Owners)
                            .ThenInclude(x => x.Employee)
                .       Include(x => x.Approvers)
                             .ThenInclude(x => x.Employee)
                         .Include(x => x.Reviewers)
                            .ThenInclude(x => x.Employee)
                        .Include(x => x.PolicyCategories);
            int count = await query.CountAsync();
            return (await query.OrderBy(x => x.CreationTime).PageBy(skipCount, maxResultCount).ToListAsync(cancellationToken), count);
        }

        public override async Task<IQueryable<Policy>> WithDetailsAsync()
        {
            return (await GetQueryableAsync())
                .Include(x => x.Owners)
                    .ThenInclude(x => x.Employee)
                .Include(x => x.Approvers)
                    .ThenInclude(x => x.Employee)
                .Include(x => x.Reviewers)
                    .ThenInclude(x => x.Employee)
                .Include(x => x.PolicyCategories);
        }
    }
}
