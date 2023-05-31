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
    }
}
