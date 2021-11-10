using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.Domains
{
    public interface IDomainRepository : IRepository<Domain, Guid>
    {
    }
}