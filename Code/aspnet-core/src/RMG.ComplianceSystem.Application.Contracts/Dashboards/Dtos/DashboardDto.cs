using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Dashboards.Dtos
{
    public class DashboardDto
    {
        public int UsersCount { get; set; }
        public int ActiveUsersCount { get; set; }
        public int DepartmentsCount { get; set; }
        public int ActiveFrameworksCount { get; set; }
        public int FrameworksCount { get; set; }
        public int ImplementedCompliantFrameworksCount { get; set; }
        public int AuditsCount { get; set; }
        public int RisksCount { get; set; }
        public int ActionsCount { get; set; }

        public DashboardActionsDto ActionsDto { get; set; } = new DashboardActionsDto();
        public DashboardAuditsDto AuditsDto { get; set; } = new DashboardAuditsDto();
        public DashboardRisksDto RisksDto { get; set; } = new DashboardRisksDto();
        public DashboardRisksLevelDto RisksLevelDto { get; set; } = new DashboardRisksLevelDto();
        public List<DashboardFrameworkCompliancePercentage> FrameworkCompliancePercentage { get; set; } = new List<DashboardFrameworkCompliancePercentage>();
    }

    public class DashboardActionsDto
    {
        public int LateActionsCount { get; set; }
        public int DoneActionsCount { get; set; }
        public int InProgressActionsCount { get; set; }
        public int NotStartedActionsCount { get; set; }
    }

    public class DashboardAuditsDto
    {
        public int LateAuditsCount { get; set; }
        public int DoneAuditsCount { get; set; }
        public int UnderPreparationAuditsCount { get; set; }
        public int UnderExecutionAuditsCount { get; set; }
    }

    public class DashboardRisksDto
    {
        public int OpenRisksCount { get; set; }
        public int ClosedRisksCount { get; set; }
        public int UnderRevisionRisksCount { get; set; }
    }

    public class DashboardRisksLevelDto
    {
        public int HighCount { get; set; }
        public int MediumCount { get; set; }
        public int LowCount { get; set; }
    }

    public class DashboardFrameworkCompliancePercentage
    {
        public Guid FrameworkId { get; set; }
        public int CompliantCount { get; set; }
        public int PartialCompliantCount { get; set; }
        public int NotCompliantCount { get; set; }
    }
}
