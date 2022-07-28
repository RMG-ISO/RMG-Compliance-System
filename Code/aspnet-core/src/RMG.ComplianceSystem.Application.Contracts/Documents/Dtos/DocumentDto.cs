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
        public IdentityUserDto UserDto { get; set; }
        public  AttachmentDto Attachment { get; set; }
    }

    public class FullDocumentDto 
    {
        public DocumentCategoryDto DocumentCategoryDto { get; set; }
        public List<DocumentDto> documentDtos { get; set; }
    }

}      