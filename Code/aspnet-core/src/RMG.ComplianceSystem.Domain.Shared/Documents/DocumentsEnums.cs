using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Documents
{
    public enum DocumentStatus
    {
        Draft,
        UnderReview,
        Accepted,
        ReturnToCreator,
        Approved,
        Published,
        Acknowledgment,
        Implemented,
        UnderMonitoring,
        Retired
    }

    public enum DocumentType
    {
        Policy = 1, Procedure = 2, Plan = 3, Strategy = 4
    }

    public enum DocumentSectionStatus
    {
        Draft = 1,
        Completed
    }

    public enum PrincipleStatus
    {
        NotApplicable,
        NotComply,
        PartiallyComply,
        Comply
    }


}
