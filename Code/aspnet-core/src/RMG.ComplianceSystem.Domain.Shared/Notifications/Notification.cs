using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Notifications
{
    public enum Priority
    {
        Normal = 0,
        Low = 1,
        High = 2
    }
    public enum NotificationType
    {
        Email,
        Push,
        SMS
    }
    public enum Status
    {
        Created,
        Fail,
        Success,
        Seen,
        NotSeen,
    }
    public enum NotySource
    {
        RiskTreatment,
        Risk,
        InternalAuditPreparation,
        //Compilance,
        //Document,

    }
    
}
