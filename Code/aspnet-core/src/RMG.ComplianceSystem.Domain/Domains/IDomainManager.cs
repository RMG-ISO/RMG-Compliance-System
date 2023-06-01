using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Services;

namespace RMG.ComplianceSystem.Domains
{
    public interface IDomainManager : IDomainService
    {
        bool CanStartReview(Domain domain, Guid frameworkOwnerId, Guid userId);
        bool CanReturnToResponsible(Domain domain, Guid frameworkOwnerId, Guid userId);
        bool CanSendToOwner(Domain domain, Guid userId);
        bool CanApproveCompliance(Domain domain, Guid frameworkOwnerId, Guid userId);
        bool CanStartInternalAssessment(Domain domain, Guid userId);
        bool CanEndInternalAssessment(Domain domain, Guid userId);
    }
}
