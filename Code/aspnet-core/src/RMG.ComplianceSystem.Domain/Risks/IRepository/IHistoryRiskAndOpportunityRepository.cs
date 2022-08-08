using RMG.ComplianceSystem.Risks.Entity;
using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.Risks.IRepository
{
    public interface IHistoryRiskAndOpportunityRepository : IRepository<HistoryRiskAndOpportunity, Guid>
    {
    }
}