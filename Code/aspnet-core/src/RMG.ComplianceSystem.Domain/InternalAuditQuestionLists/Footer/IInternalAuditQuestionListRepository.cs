using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.InternalAuditQuestionLists
{
    public interface IInternalAuditQuestionListRepository : IRepository<InternalAuditQuestionList, Guid>
    {
    }
}