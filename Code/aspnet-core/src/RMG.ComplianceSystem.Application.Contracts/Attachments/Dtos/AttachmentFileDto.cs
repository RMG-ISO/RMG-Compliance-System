using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Attachments.Dtos
{
    [Serializable]
    public class AttachmentFileDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public string Name { get; set; }

        public double Size { get; set; }

        public string DisplayName { get; set; }

        public string Extention { get; set; }

        public Guid AttachmentId { get; set; }

    }
}