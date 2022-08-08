using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Risks.Enums
{
    public enum PotentialRisk
    {
        Low = 1, Medium = 2, Significant = 3, High = 4
    }
    public enum ControlAssessment
    {
        Adequate = 1, Effective = 2, Strong = 3, NeedsImprovement = 4
    }
    public enum Likelihood
    {
        Likely = 1, AlmostCertain = 2, Unlikely = 3, Rare = 4
    }

    public enum Consequence
    {
        Insignificant = 1, Minor = 2, Significant = 3, Extreme = 4
    }

}
