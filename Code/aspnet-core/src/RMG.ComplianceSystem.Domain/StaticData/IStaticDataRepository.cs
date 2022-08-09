using RMG.ComplianceSystem.Risks.Entity;
using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.StaticData

{
    public interface IStaticDataRepository : IRepository<StaticDatatb, Guid>
    {
    }
}