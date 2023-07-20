using AutoMapper.Execution;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.Policies
{
    public interface IPolicyRepository : IRepository<Policy , Guid>
    {
        Task<(List<Policy>, int count)> GetListAsync(
                                                      PolicyStatus? Status,
                                                      PolicyType? Type,
                                                      string sorting = null,
                                                      int maxResultCount = int.MaxValue,
                                                      int skipCount = 0,
                                                      CancellationToken cancellationToken = default);

    }
}
