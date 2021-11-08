using RMG.ComplianceSystem.Shared;
using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Frameworks.Dtos
{
    [Serializable]
    public class FrameworkDto : FullAuditedEntityWithUserDto<Guid,IdentityUserDto>
    {
        public string NameAr { get; set; }

        public string NameEn { get; set; }

        public string ShortcutAr { get; set; }

        public string ShortcutEn { get; set; }

        public string DescriptionAr { get; set; }

        public string DescriptionEn { get; set; }

        public SharedStatus Status { get; set; }
    }
}