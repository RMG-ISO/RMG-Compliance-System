using RMG.ComplianceSystem.InternalAuditQuestions;
using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.InternalAuditQuestions
{
    public interface IInternalAuditQuestionRepository : IRepository<InternalAuditQuestion, Guid>
    {
    }
}