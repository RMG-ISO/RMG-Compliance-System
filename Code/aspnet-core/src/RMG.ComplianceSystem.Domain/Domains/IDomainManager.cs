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
        bool CanStartInternalAssessment(Domain domain, Guid userId);
    }
}
