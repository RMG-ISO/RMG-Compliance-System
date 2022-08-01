using RMG.ComplianceSystem.Attachments.Dtos;
using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    [Serializable]
    public class DocumentDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public string TitleAr { get; set; }
        public string TitleEn { get; set; }
        public Guid CategoryId { get; set; }
        public Guid AttachmentId { get; set; }
        public string CategoryNameAr { get; set; }
        public string CategoryNameEn { get; set; }
        public string CreatorUserName { get; set; }
        public string UpdateUserName { get; set; }
        public  AttachmentDto Attachment { get; set; }
    }

  

}      