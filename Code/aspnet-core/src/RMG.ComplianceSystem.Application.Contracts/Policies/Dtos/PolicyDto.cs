using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Attachments.Dtos
{
    [Serializable]
    public class PolicyDto : FullAuditedEntityWithUserDto<Guid,IdentityUserDto>
    {
        public string Title { get; set; }
        public string TermsAndPrivacy { get; set; }
        public bool Approve { get; set; }
        public int CompanyId { get; set; }
        public Guid AttachmentId { get; set; }

        public  AttachmentDto Attachment { get; set; }
    }
}