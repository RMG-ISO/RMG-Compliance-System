import type { AuditedEntityDto, FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { IdentityUserDto } from '../../volo/abp/identity/models';
import type { RiskTreatmentDto } from '../../risk-treatments/models';

export interface RiskAndOpportunityDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  nameAr?: string;
  nameEn?: string;
  detailsAr?: string;
  detailsEn?: string;
  affectDetailsAr?: string;
  affectDetailsEn?: string;
  status?: number;
  frameWorkId?: string;
  standardId?: string;
  sectorId?: string;
  generalDepartmentId?: string;
  departmentId?: string;
  categoryId?: string;
  ownerId?: string;
  ownerName?: string;
  type?: number;
  workFlowStages?: number;
  riskContext?: string;
  existingControlEn?: string;
  existingControlAr?: string;
  controlAssessment?: string;
  numberMatrix?: number;
  likelihood?: number;
  impact?: number;
  potential?: number;
  isTreatment?: boolean;
  potentialNameAr?: string;
  potentialNameEn?: string;
  riskTreatmentOption?: string;
  riskTreatmentDto: RiskTreatmentDto[];
  reEvaluation?: number;
  acceptance: boolean;
  acceptanceApprovedby?: string;
  reviewControlAssessment?: string;
  reviewRemarks?: string;
  departmentName?: string;
}

export interface CreateUpdateRiskAndOpportunityDto {
  nameAr?: string;
  nameEn?: string;
  detailsAr?: string;
  detailsEn?: string;
  affectDetailsAr?: string;
  affectDetailsEn?: string;
  frameWorkId?: string;
  status: number;
  standardId?: string;
  sectorId?: string;
  generalDepartmentId?: string;
  departmentId?: string;
  categoryId?: string;
  ownerId?: string;
  type?: number;
  workFlowStages?: number;
  riskContext?: string;
  existingControlEn?: string;
  existingControlAr?: string;
  controlAssessment?: string;
  numberMatrix?: number;
  likelihood?: number;
  impact?: number;
  potential?: number;
  isTreatment?: boolean;
  riskTreatmentOption?: string;
  reEvaluation?: number;
  acceptance: boolean;
  acceptanceApprovedby?: string;
  reviewControlAssessment?: string;
  reviewRemarks?: string;
}

export interface HistoryRiskAndOpportunityDto extends AuditedEntityDto<string> {
  userId?: string;
  riskAndOpportunityId?: string;
  workFlowStages?: number;
  actionName?: number;
  actionDate?: string;
  creator: IdentityUserDto;
}

export interface HistoryRiskOpportunityPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
  workFlowStages?: number;
  riskOpportunityId?: string;
}

export interface RiskOpportunityPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
  type?: number;
  potential?: number;
  reEvaluation?: number;
  potentialValue?: number;
  ownerId?: string;
  status?: number;
  userId?: string;
  departmentId?: string;
}
