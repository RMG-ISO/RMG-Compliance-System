using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Domain.Services;

namespace RMG.ComplianceSystem.Domains
{
    public class DomainManager : DomainService, IDomainManager
    {
        public bool CanStartInternalAssessment(Domain domain, Guid userId)
        {
            if (domain.ComplianceStatus != ComplianceStatus.ReadyForInternalAssessment)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.DomainMustBeReadyForInternalAssessmentToStartInternalAssessment);
            if (domain.ResponsibleId != userId) 
                throw new BusinessException(ComplianceSystemDomainErrorCodes.OnlyDomainResponsibleCanStartInternalAssessment);
            return true;
        }

        public bool CanEndInternalAssessment(Domain domain, Guid userId)
        {
            if (domain.ComplianceStatus != ComplianceStatus.UnderInternalAssessment)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.DomainMustBeUnderInternalAssessmentToEndInternalAssessment);
            if (domain.ResponsibleId != userId)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.OnlyDomainResponsibleCanStartInternalAssessment);
            return true;
        }

        public bool CanStartReview(Domain domain, Guid frameworkOwnerId, Guid userId)
        {
            if (domain.ComplianceStatus != ComplianceStatus.ReadyForRevision)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.DomainMustBeReadyForRevisionToStartReview);
            if (frameworkOwnerId != userId)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.OnlyFrameworkOwnerCanStartReview);
            return true;
        }

        public bool CanReturnToResponsible(Domain domain, Guid frameworkOwnerId, Guid userId)
        {
            if (domain.ComplianceStatus != ComplianceStatus.UnderRevision
                && domain.ComplianceStatus != ComplianceStatus.UnderReRevision)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.DomainMustBeUnderRevisionOrUnderReRevisionToReturnToResponsible);
            if (frameworkOwnerId != userId)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.OnlyFrameworkOwnerCanReturnToResponsible);
            return true;
        }

        public bool CanSendToOwner(Domain domain, Guid userId)
        {
            if (domain.ComplianceStatus != ComplianceStatus.UnderInternalReAssessment)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.DomainMustBeUnderInternalReAssessmentToSendToOwner);
            if (domain.ResponsibleId != userId)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.OnlyDomainResponsibleCanSendToOwner);
            return true;
        }

        public bool CanApproveCompliance(Domain domain, Guid frameworkOwnerId, Guid userId)
        {
            if (domain.ComplianceStatus != ComplianceStatus.UnderRevision
                && domain.ComplianceStatus != ComplianceStatus.UnderReRevision)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.DomainMustBeUnderRevisionOrUnderReRevisionToApproveCompliance);
            if (frameworkOwnerId != userId)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.OnlyFrameworkOwnerCanApproveCompliance);
            return true;
        }
    }
}
