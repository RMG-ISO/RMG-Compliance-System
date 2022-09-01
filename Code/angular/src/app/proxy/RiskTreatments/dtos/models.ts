import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.account';

export interface CreateUpdateRiskTreatmentDto {
  RiskOpportunityId?: string;
  MitigateActionPlanEn?: string;
  StandardReferenceEn?: string;
  ObjectiveEvidenceEn?: string;
  MitigateActionPlanAr?: string;
  StandardReferenceAr?: string;
  ObjectiveEvidenceAr?: string;
  StandardReference?: string;
  Responsibility?: string;
  ByWhen?: Date;
  ReEvaluation?: string;
  ChangeStatus?: string;
  Likelihood ?:string ;
  Impact ?:string ;
  PotentialRisk ?:string ;
}

export interface RiskTreatmentDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  RiskOpportunityId?: string;
  MitigateActionPlanEn?: string;
  StandardReferenceEn?: string;
  ObjectiveEvidenceEn?: string;
  MitigateActionPlanAr?: string;
  StandardReferenceAr?: string;
  ObjectiveEvidenceAr?: string;
  StandardReference?: string;
  Responsibility?: string;
  ResponsibilityName?:string;
  ByWhen?: Date;
  ReEvaluation?: string;
  ChangeStatus?: string;
  Likelihood ?:string ;
  Impact ?:string ;
  PotentialRisk ?:string ;
}

export interface RiskTreatmentPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  RiskOpportunityId?: string;
}
