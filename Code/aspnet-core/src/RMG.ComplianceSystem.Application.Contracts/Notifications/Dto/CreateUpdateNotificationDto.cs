using System;
using System.ComponentModel;
namespace RMG.ComplianceSystem.Notifications.Dtos
{
    [Serializable]
    public class CreateUpdateNotificationDto
    {
        public string DisplayName { get; set; }

        public string From { get; set; }

        public string To { get; set; }

        public string ReplyTo { get; set; }

        public string CC { get; set; }

        public string Subject { get; set; }

        public Priority? Priority { get; set; }

        public Type Type { get; set; }

        public Status Status { get; set; }

        public DateTime SendDate { get; set; }

        public string Body { get; set; }

        public bool IsHTML { get; set; }

        public bool IsSSL { get; set; }

        public string Attachments { get; set; }
    }
}