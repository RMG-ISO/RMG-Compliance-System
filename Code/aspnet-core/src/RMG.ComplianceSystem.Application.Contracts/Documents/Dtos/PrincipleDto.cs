using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class PrincipleDto : FullAuditedEntityDto<Guid>
    {
        public Guid DocumentId { get; set; }
        public string Reference { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ComplianceScore { get; set; }
        public PrincipleStatus? Status { get; set; }
        public List<NameId<Guid>> Controls { get; set; } = new List<NameId<Guid>>();
    }
}