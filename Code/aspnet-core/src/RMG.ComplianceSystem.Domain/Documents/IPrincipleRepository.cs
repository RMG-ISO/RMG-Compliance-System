using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.Documents
{
    public interface IPrincipleRepository : IRepository<Principle, Guid>
    {
    }
}