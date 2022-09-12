using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Notifications.Dtos
{
    public class NotifyUserNotificationDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public Status Status { get; set; }
    }
}
