using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.Assessments
{
    public interface IAssessmentRepository : IRepository<Assessment, Guid>
    {
    }
}