
export interface DashboardActionsDto {
  lateActionsCount: number;
  doneActionsCount: number;
  inProgressActionsCount: number;
  notStartedActionsCount: number;
}

export interface DashboardAuditsDto {
  lateAuditsCount: number;
  doneAuditsCount: number;
  underPreparationAuditsCount: number;
  underExecutionAuditsCount: number;
}

export interface DashboardDto {
  usersCount: number;
  activeUsersCount: number;
  departmentsCount: number;
  activeFrameworksCount: number;
  frameworksCount: number;
  implementedCompliantFrameworksCount: number;
  auditsCount: number;
  risksCount: number;
  actionsCount: number;
  actionsDto: DashboardActionsDto;
  auditsDto: DashboardAuditsDto;
  risksDto: DashboardRisksDto;
  risksLevelDto: DashboardRisksLevelDto;
  frameworkCompliancePercentage: DashboardFrameworkCompliancePercentage[];
}

export interface DashboardFrameworkCompliancePercentage {
  frameworkId?: string;
  compliantCount: number;
  partialCompliantCount: number;
  notCompliantCount: number;
}

export interface DashboardRisksDto {
  openRisksCount: number;
  closedRisksCount: number;
  underRevisionRisksCount: number;
}

export interface DashboardRisksLevelDto {
  highCount: number;
  mediumCount: number;
  lowCount: number;
}
