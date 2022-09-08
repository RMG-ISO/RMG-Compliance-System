using RMG.ComplianceSystem.Risks.Dtos;
using RMG.ComplianceSystem.Attachments.Dtos;
using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Notifications
{
    [Serializable]
    public class NotificationDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public string DisplayName { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string ReplyTo { get; set; }
        public string CC { get; set; }
        public string Subject { get; set; }
        public Priority? Priority { get; set; }
        public NotificationType Type { get; set; }
        public Status Status { get; set; }
        public DateTime SendDate { get; set; }
        public string Body { get; set; }
        public bool IsHTML { get; set; }
        public bool IsSSL { get; set; }
        public string Attachments { get; set; }
        public string Url { get; set; }
        public NotySource? Source { get; set; }
        public Guid? ReferenceId { get; set; }
        public bool SourceIsDeleted { get; set; }

    }
}
