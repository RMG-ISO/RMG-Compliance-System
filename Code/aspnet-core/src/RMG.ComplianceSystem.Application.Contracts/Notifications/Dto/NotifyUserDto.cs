using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Notifications.Dtos
{
    public class NotifyUserDto
    {
        public long UnReadNotifications { get; set; }
        public List<NotifyUserNotificationDto> Notifications { get; set; }
    }
}
