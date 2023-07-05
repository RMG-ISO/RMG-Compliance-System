using RMG.ComplianceSystem.Shared;
using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Controls.Dtos
{
    [Serializable]
    public class ControlDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public string NameAr { get; set; }

        public string NameEn { get; set; }

        public string DescriptionAr { get; set; }

        public string DescriptionEn { get; set; }

        public string Reference { get; set; }

        public SharedStatus Status { get; set; }

        public Guid? ParentId { get; set; }
        public string MainControlNameAr { get; set; }
        public string MainControlNameEn { get; set; }

        public Guid DomainId { get; set; }
        public int CompliancePercentage { get; set; }
    }
}