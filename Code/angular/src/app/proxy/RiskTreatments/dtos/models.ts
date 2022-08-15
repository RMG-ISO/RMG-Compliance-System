import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.account';

export interface CreateUpdateRiskTreatmentDto {
  RiskOpportunityId?: string;
  MitigateActionPlan?: string;
  StandardReference?: string;
  ObjectiveEvidence?: string;
  Responsibility?: string;
  ByWhen?: Date;
  ReEvaluation?: number;
}

export interface RiskTreatmentDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  RiskOpportunityId?: string;
  MitigateActionPlan?: string;
  StandardReference?: string;
  ObjectiveEvidence?: string;
  Responsibility?: string;
  ByWhen?: Date;
  ReEvaluation?: number;
}

export interface RiskTreatmentPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  RiskOpportunityId?: string;
}
