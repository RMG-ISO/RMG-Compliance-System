using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.InternalAuditPreparations
{
    public interface IInternalAuditRiskRepository : IRepository<InternalAuditRisk, Guid>
    {

    }
}