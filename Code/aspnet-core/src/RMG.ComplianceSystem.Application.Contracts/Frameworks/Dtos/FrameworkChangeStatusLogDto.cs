using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Frameworks
{
    public class FrameworkChangeStatusLogDto : CreationAuditedEntityDto<Guid>
    {
        public string CreatorName { get; set; }
        public FrameworkStatus Status { get; set; }
        public string Comment { get; set; }
        public Guid FrameworkId { get; set; }

    }
}
