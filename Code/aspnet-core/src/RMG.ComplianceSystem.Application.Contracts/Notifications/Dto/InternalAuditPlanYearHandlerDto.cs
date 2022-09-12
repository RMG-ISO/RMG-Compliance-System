using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RMG.ComplianceSystem.Notifications.Dtos
{
    [Serializable]
    public class InternalAuditPlanYearHandlerDto
    {
        public string Subject { get; set; }
        public string Creator { get; set; }
        public string Title { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
    }
}
