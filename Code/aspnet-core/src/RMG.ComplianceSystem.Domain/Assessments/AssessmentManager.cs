using RMG.ComplianceSystem.Domains;
using RMG.ComplianceSystem.Frameworks;
using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Domain.Services;

namespace RMG.ComplianceSystem.Assessments
{
    public class AssessmentManager : DomainService, IAssessmentManager
    {
        public bool CanUpdateApplicableProperty(Guid frameworkOwnerId, Guid userId)
        {
            if (frameworkOwnerId != userId)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.OnlyFrameworkOwnerCanChangeAssessmentApplicable);
            return true;
        }

        public bool CanCreateAssessment(Guid frameworkOwnerId, Guid userId)
        {
            if (frameworkOwnerId != userId)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.OnlyFrameworkOwnerCanStartAssessmentForControl);
            return true;
        }

        public bool CanFrameworkOwnerUpdate(Framework framework)
        {
            if (framework.ComplianceStatus == ComplianceStatus.NotStarted
                || framework.ComplianceStatus == ComplianceStatus.ReadyForInternalAssessment
                || framework.ComplianceStatus == ComplianceStatus.UnderInternalAssessment
                || framework.ComplianceStatus == ComplianceStatus.UnderInternalReAssessment)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.AssessmentCanBeUpdatedByFrameworkOwnerWhenComplianceUnderPreparationOrUnderRevision);

            return true;
        }

        public bool CanDomainResponsibleUpdate(Framework framework, Domain domain)
        {
            if (framework.ComplianceStatus == ComplianceStatus.NotStarted
                || framework.ComplianceStatus == ComplianceStatus.UnderPreparation
                || domain.ComplianceStatus == ComplianceStatus.ReadyForRevision
                || domain.ComplianceStatus == ComplianceStatus.UnderRevision
                || domain.ComplianceStatus == ComplianceStatus.UnderReRevision)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.AssessmentCanOnlyBeUpdatedByDomainResponsibleWhenComplianceUnderInternalAssessment);

            return true;
        }
    }
}
