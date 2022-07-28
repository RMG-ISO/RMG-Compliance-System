using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    [Serializable]
    public class DocumentCategoryDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public Guid TenantId { get; set; }

    }
}