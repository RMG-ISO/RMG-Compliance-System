using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Notifications.Dtos
{
    public class NotificationPagedAndSortedResultRequestDto: PagedAndSortedResultRequestDto
    {
        public string Body { get; set; }
        public DateTime? CreationTime { get; set; }
        public NotySource? Source { get; set; }
    }
}
