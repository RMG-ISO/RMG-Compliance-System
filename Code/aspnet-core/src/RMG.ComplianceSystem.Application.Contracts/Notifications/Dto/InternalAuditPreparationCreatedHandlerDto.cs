using System;

namespace RMG.ComplianceSystem.Notifications
{
    [Serializable]

    public class InternalAuditPreparationCreatedHandlerDto
    {
        public string AuditCode { get; set; }
        public string AuditTitleEn { get; set; }
        public string AuditTitleAr { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
       
        public class InternalAuditPreparationNotificationDto
    {
        public string AuditCode { get; set; }
        public string AuditTitleEn { get; set; }
        public string AuditTitleAr { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
    
}