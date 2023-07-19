using JetBrains.Annotations;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Policies
{
    public class PolicyListDto : FullAuditedEntityDto<Guid>
    {
        public string Code { get; set; }
        [NotNull]
        public string Name { get; set; }
    }
}
