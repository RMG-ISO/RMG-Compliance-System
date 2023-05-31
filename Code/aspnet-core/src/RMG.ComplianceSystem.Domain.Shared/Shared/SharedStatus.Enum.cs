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
    public enum FrameworkStatus : byte
    {
        NewFramework,
        UnderReview,
        UnderApproval,
        Approved,
        ReturnedToCreator
    }
    public enum NotificationSource 
    {
        RiskTreatment,
        Risk,
        InternalAuditPreparation,
        FrameworkWorkflowAction,
        DomainResponsibleStartSelfAssessment
    }
     public enum Status
    {
        Due,
        Delayed,
        Closed,
        Soon,
        Future
    }

    public enum ComplianceStatus
    {
        NotStarted = 0,
        UnderPreparation,
        UnderProgress
    }

}
