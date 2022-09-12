using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.EmailTemplates
{
    public class EmailTemplate : FullAuditedEntity<Guid>
    {
        public string Key { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string NotificationBody { get; set; }




        protected EmailTemplate()
        {
        }

        public EmailTemplate(
            Guid id,
            string key,
            string subject,
            string body,
            string notificationBody
        ) : base(id)
        {
            Key = key;
            Subject = subject;
            Body = body;
            NotificationBody = notificationBody;
        }
    }
}
