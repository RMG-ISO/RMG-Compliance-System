using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Shared
{
   public enum SharedStatus : byte
    {
        Inactive,
        Active,
    }
    public enum NotificationSource 
    {
        RiskTreatment,
        Risk,
        InternalAuditPreparation
    }
     public enum Status
    {
        Due,
        Delayed,
        Closed,
        Soon,
        Future
    }

}
