using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.Frameworks
{
    public interface IFrameworkRepository : IRepository<Framework, Guid>
    {
    }
}