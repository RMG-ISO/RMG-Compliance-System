using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Notifications.Dtos
{
    public class DoActionWorkFlowNotificationDto
    {
        public string _emailTo { get; set; }
        public Guid NotificationTo { get; set; }
        public List<string> _emailsTo { get; set; }
        public List<Guid> NotificationsTo { get; set; }
        public string _subject { get; set; }
        public string _body { get; set; }
        public string _CC { get; set; }
        public string _notificationBody { get; set; }

    }
}
