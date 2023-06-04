using RMG.ComplianceSystem.Domains;
using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;

namespace RMG.ComplianceSystem.Frameworks
{
    public class FrameworkManager : DomainService, IFrameworkManager
    {
        public bool CanStartSelfAssessment(Framework framework)
        {
            if (framework.FrameworkStatus != Shared.FrameworkStatus.Approved)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.FrameworkMustBeApprovedToStartSelfAssessment);

            if (framework.Status != Shared.SharedStatus.Active)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.FrameworkMustBeActivatedToStartSelfAssessment);

            return true;
        }

        public bool CanUpdate(Framework framework)
        {
            if (framework.ComplianceStatus != Shared.ComplianceStatus.NotStarted)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.FrameworkCannotBeUpdatedAfterStartingSelfAssessment);

            return true;
        }

        public bool CanActivateDeactivate(Framework framework, Guid userId)
        {
            if (framework.OwnerId != userId)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.OnlyFrameworkOwnerCanActivateDeactivateFramework);
            if (framework.FrameworkStatus != Shared.FrameworkStatus.Approved)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.OnlyApprovedFrameworkCanBeActivatedDeactivated);

            if (framework.ComplianceStatus != ComplianceStatus.NotStarted && framework.ComplianceStatus != ComplianceStatus.Approved)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.CannotDeactivateFrameworkInsideComplianceLoop);
            return true;
        }

        public bool CanApproveCompliance(Framework framework, List<Domain> domains, Guid userId)
        {
            if (framework.ComplianceStatus != ComplianceStatus.UnderRevision
                && framework.ComplianceStatus != ComplianceStatus.UnderReRevision)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.FrameworkMustBeUnderRevisionOrUnderReRevisionToApproveCompliance);
            if (framework.OwnerId != userId)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.OnlyFrameworkOwnerCanApproveCompliance);
            if (domains.Any(d => d.ComplianceStatus != ComplianceStatus.Approved))
                throw new BusinessException(ComplianceSystemDomainErrorCodes.AllDomainsMustBeApprovedFirstToApproveFramework);
            return true;
        }
        
        public bool CanDelete(Framework framework)
        {
            if (framework.ComplianceStatus != ComplianceStatus.NotStarted && framework.ComplianceStatus != ComplianceStatus.Approved)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.CannotDeleteFrameworkInsideComplianceLoop);
            return true;
        }
    }
}
