using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.InternalAuditApproves
{
    public interface IInternalAuditApproveRepository : IRepository<InternalAuditApprove, Guid>
    {

    }
}