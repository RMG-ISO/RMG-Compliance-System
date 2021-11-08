using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Attachments.Dtos
{
    [Serializable]
    public class AttachmentDto : FullAuditedEntityWithUserDto<Guid,IdentityUserDto>
    {
        public bool IsMultiple { get; set; }

        public int MaxFileSize { get; set; }

        public string FileExtentions { get; set; }

        public ICollection<AttachmentFileDto> AttachmentFiles { get; set; }
    }
}