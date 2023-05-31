using RMG.ComplianceSystem.Domains;
using RMG.ComplianceSystem.Frameworks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Services;

namespace RMG.ComplianceSystem.Assessments
{
    public interface IAssessmentManager : IDomainService
    {
        bool CanUpdateApplicableProperty(Guid frameworkOwnerId, Guid userId);
        bool CanFrameworkOwnerUpdate(Framework framework);
        bool CanDomainResponsibleUpdate(Framework framework, Domain domain);
        bool CanCreateAssessment(Guid frameworkOwnerId, Guid userId);
    }
}
