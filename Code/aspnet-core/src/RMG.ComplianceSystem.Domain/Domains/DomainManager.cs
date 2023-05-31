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
    public class DomainManager : DomainService, IDomainService
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
    }
}
