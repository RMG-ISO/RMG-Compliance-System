import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.account';

export interface CreateUpdateRiskAndOpportunityDto {
  NameAr ?:string ;
  NameEn ?:string ;
  DetailsAr ?:string ;
  DetailsEn ?:string ;
  AffectDetailsAr ?:string ;
  AffectDetailsEn ?:string ;
  StandardId ?:string ;
  SectorId ?:string ;
  GeneralDepartmentId ?:string ;
  DepartmentId ?:string ;
  CategoryId ?:string ;
  OwnerId ?:string ;
  // Opportunity - Risk (Enum)
  Type ?:number ;
  WorkFlowStages ?:number ;
  RiskContext ?:number ;
  //Analysis--------------------
  ExistingControl ?:string ;
  ControlAssessment ?:number ;
  Likelihood ?:number ;
  Consequence ?:number ;
  //Evaluation---------------------------
  PotentialRisk ?:number ;
  RiskTreatmentOption ?:string ;
  //Risk Treatment/ Action Plan---------------------------
  MitigateActionPlan ?:string ;
  StandardReference ?:string ;
  ObjectiveEvidence ?:string ;
  Responsibility ?:string ;
  ByWhen ?:Date ;
  TreatmentRemarks ?:string ;
  //Risk Monitoring &  Review---------------------------
  Acceptance ?:boolean ;
  AcceptanceApprovedby ?:string ;
  ReviewControlAssessment ?:string ;
  ReviewRemarks ?:string ;

}

export interface RiskAndOpportunityDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  NameAr ?:string ;
  NameEn ?:string ;
  DetailsAr ?:string ;
  DetailsEn ?:string ;
  AffectDetailsAr ?:string ;
  AffectDetailsEn ?:string ;
  StandardId ?:string ;
  SectorId ?:string ;
  GeneralDepartmentId ?:string ;
  DepartmentId ?:string ;
  CategoryId ?:string ;
  OwnerId ?:string ;
  // Opportunity - Risk (Enum)
  Type ?:number ;
  WorkFlowStages ?:number ;
  RiskContext ?:number ;
  //Analysis--------------------
  ExistingControl ?:string ;
  ControlAssessment ?:number ;
  Likelihood ?:number ;
  Consequence ?:number ;
  //Evaluation---------------------------
  PotentialRisk ?:number ;
  OwnerName?:string ;
  PotentialNameAr?:string ;
  PotentialNameEn?:string ;
  RiskTreatmentOption ?:string ;
  //Risk Treatment/ Action Plan---------------------------
  // MitigateActionPlan ?:string ;
  // StandardReference ?:string ;
  // ObjectiveEvidence ?:string ;
  // Responsibility ?:string ;
  // ByWhen ?:Date ;
  // TreatmentRemarks ?:string ;
  ReEvaluation ?:number ;
  //Risk Monitoring &  Review---------------------------
  Acceptance ?:boolean ;
  AcceptanceApprovedby ?:string ;
  ReviewControlAssessment ?:string ;
  ReviewRemarks ?:string ;
}
export interface UserPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  Filter?: string;
}
export interface RiskOpportunityPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
  type?: number;
}

// ////Document Category//////
export interface CreateUpdateHistoryRiskAndOpportunityDto {
  UserId ?: string;
  RiskAndOpportunityId ?: string;
  ActionName ?: string;
  ActionDate ?: Date;
}

export interface HistoryRiskAndOpportunityDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  UserId ?: string;
  RiskAndOpportunityId ?: string;
  ActionName ?: string;
  ActionDate ?: Date;
}

export interface HistoryRiskOpportunityPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
  riskOpportunityId?:string;
  userId?:string;
}
