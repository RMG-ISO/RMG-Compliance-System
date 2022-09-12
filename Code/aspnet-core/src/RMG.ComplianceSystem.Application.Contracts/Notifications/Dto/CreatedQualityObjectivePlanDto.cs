using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Notifications.Dtos
{
    [Serializable]
    public class CreatedQualityObjectivePlanDto
    {
        public string Subject { get; set; }
        public string Creator { get; set; }
        public string PlanName { get; set; }
        public string StartDate { get; set; }
        public string DueDate { get; set; }
        public string ResponsibleName { get; set; }
    }
}
