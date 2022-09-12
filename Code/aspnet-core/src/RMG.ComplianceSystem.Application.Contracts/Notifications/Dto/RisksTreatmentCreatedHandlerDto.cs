using System;

namespace RMG.ComplianceSystem.Notifications
{
    [Serializable]

    public class RisksTreatmentCreatedHandlerDto
    {
        public string MitigateActionPlanEn { get; set; }
        public string MitigateActionPlanAr { get; set; }
        public string ActionDetailsEn { get; set; }
        public string ActionDetailsAr { get; set; }
        public string DueDate { get; set; }
        public string? AchievementPercentage { get; set; }
    }

        public class RisksTreatmentNotificationDto
    {
        public string MitigateActionPlanAr { get; set; }
        public string ActionDetailsAr { get; set; }
        public string DueDate { get; set; }
    }
    
}