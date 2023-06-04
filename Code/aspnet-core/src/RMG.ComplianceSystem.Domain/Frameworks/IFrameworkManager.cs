using RMG.ComplianceSystem.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Services;

namespace RMG.ComplianceSystem.Frameworks
{
    public interface IFrameworkManager : IDomainService
    {
        bool CanApproveCompliance(Framework framework, List<Domain> domains, Guid userId);
        bool CanStartSelfAssessment(Framework framework, List<Domain> domains);
        bool CanUpdate(Framework framework);
        bool CanActivateDeactivate(Framework framework, Guid userId);
        bool CanDelete(Framework framework);
    }
}
