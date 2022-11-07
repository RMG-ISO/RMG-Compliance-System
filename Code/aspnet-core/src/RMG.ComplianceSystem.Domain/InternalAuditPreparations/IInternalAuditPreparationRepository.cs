using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.InternalAuditPreparations
{
    public interface IInternalAuditPreparationRepository : IRepository<InternalAuditPreparation, Guid>
    {

    }
}