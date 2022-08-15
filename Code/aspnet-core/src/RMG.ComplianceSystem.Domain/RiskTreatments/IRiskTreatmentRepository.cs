using RMG.ComplianceSystem.RiskTreatments;
using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.RiskTreatments
{
    public interface IRiskTreatmentRepository : IRepository<RiskTreatment, Guid>
    {
    }
}