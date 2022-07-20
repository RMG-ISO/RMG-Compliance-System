using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.Policies
{
    public interface IPolicyRepository : IRepository<Policy, Guid>
    {
    }
}