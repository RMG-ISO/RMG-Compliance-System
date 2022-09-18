using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.EmailTemplates.Dtos
{
    [Serializable]
    public class EmailTemplateDto :FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public string Key { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string NotificationBody { get; set; }

    }
}
