using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.InternalAuditQuestionLists
{
    public interface IInternalAuditMenuQuestionRepository : IRepository<InternalAuditMenuQuestion, Guid>
    {
    }
}