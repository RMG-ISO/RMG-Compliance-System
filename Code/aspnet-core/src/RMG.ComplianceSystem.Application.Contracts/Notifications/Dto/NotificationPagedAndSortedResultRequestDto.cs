using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Notifications
{
    public class NotificationPagedAndSortedResultRequestDto : PagedAndSortedResultRequestDto
    {
        public string DisplayName { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Subject { get; set; }
    }
}
