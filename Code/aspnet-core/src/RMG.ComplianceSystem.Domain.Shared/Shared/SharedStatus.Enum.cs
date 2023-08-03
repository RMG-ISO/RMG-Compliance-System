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
        FrameworkApproved,
        FrameworkEndSelfAssessment,
        DomainResponsibleEndInternalAssessment,
        DomainApproveCompliance,
        DomainReturnToResponsible,
        DomainSentToOwner,
        FrameworkApproveCompliance,
        FrameworkCreatedForReviewer,
        FrameworkCreatedForApprover,
        FrameworkCreatedForOwner,

        DocumentSentForRevision,
        DocumentReturnedToContributor,
        DocumentReviewedByUser,
        DocumentSentForApproval,
        DocumentApprovedByUser,
        DocumentApproved,
        DocumentShouldStartPrinciplesCompliance,
        PrincipleComplianceDataFilled

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
        ReadyForInternalAssessment,
        UnderInternalAssessment,
        ReadyForRevision,
        UnderRevision,
        UnderInternalReAssessment,
        UnderReRevision,
        Approved
    }

}
