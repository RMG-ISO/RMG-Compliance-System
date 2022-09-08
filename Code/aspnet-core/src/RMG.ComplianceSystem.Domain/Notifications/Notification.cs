using RMG.ComplianceSystem.Risks.Entity;
using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.Notifications
{
    public class Notification : FullAuditedEntity<Guid>
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

        protected Notification()
        {
        }

        public Notification(
            Guid id,
            string displayName,
            string from,
            string to,
            string replyTo,
            string cC,
            string subject,
            Priority? priority,
            NotificationType type,
            Status status,
            DateTime sendDate,
            string body,
            bool isHTML,
            bool isSSL,
            string attachments,
            string url,
            NotySource? source,
            Guid? referenceId,
            bool sourceIsDeleted
        ) : base(id)
        {
            DisplayName = displayName;
            From = from;
            To = to;
            ReplyTo = replyTo;
            CC = cC;
            Subject = subject;
            Priority = priority;
            Type = type;
            Status = status;
            SendDate = sendDate;
            Body = body;
            IsHTML = isHTML;
            IsSSL = isSSL;
            Attachments = attachments;
            Url = url;
            Source = source;
            ReferenceId = referenceId;
            SourceIsDeleted = sourceIsDeleted;
        }
    }
}
