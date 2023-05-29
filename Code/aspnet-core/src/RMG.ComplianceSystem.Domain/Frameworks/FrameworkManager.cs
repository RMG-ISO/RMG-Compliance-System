using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
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
    }
}
