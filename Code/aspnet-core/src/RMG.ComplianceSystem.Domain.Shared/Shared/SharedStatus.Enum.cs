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
