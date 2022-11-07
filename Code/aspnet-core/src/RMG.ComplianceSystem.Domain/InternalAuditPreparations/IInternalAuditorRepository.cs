using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.InternalAuditPreparations
{
    public interface IInternalAuditorRepository : IRepository<InternalAuditor, Guid>
    {

    }
}