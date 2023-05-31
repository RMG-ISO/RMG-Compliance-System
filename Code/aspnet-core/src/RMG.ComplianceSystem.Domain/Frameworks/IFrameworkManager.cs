﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Services;

namespace RMG.ComplianceSystem.Frameworks
{
    public interface IFrameworkManager : IDomainService
    {
        bool CanStartSelfAssessment(Framework framework);
        bool CanUpdate(Framework framework);
        bool CanActivateDeactivate(Framework framework, Guid userId);
    }
}
