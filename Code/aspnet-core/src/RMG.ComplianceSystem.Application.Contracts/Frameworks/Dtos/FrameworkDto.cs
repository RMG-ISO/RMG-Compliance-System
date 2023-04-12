using RMG.ComplianceSystem.Attachments.Dtos;
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
        public Guid ManagementId { get; set; }
        public SharedStatus Status { get; set; }
        public FrameworkStatus FrameworkStatus { get; set; }
        public Guid AttachmentId { get; set; }
        public Guid ReviewUserId { get; set; }
        public Guid ApproveUserId { get; set; }
        public string LevelFirstNameAr { get; set; }
        public string LevelFirstNameEn { get; set; }

        public string LevelSecondNameAr { get; set; }
        public string LevelSecondNameEn { get; set; }

        public string LevelThirdNameAr { get; set; }
        public string LevelThirdNameEn { get; set; }

        public string LevelFourNameAr { get; set; }
        public string LevelFourNameEn { get; set; }

    }
}