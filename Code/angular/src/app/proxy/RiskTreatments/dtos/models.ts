import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.account';
import { AttachmentDto } from '@proxy/attachments/dtos';

export interface CreateUpdateRiskTreatmentDto {
  RiskOpportunityId?: string;
  MitigateActionPlanEn?: string;
  MitigateActionPlanAr?: string;
  ActionDetailsAr?:string;
  ActionDetailsEn?:string;
  Responsibility?: string;
  DueDate?:Date;
  StartDate?: Date;
  CompletionDate?:Date;
  Status?: number;
  AchievementPercentage?:number;
  AttachmentId?: string;
}
export interface StatusActionDto extends FullAuditedEntityWithUserDto<IdentityUserDto, number>{
  nameEn?:string;
  nameAr?:string;
}

export interface RiskTreatmentDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  RiskOpportunityId?: string;
  MitigateActionPlanEn?: string;
  MitigateActionPlanAr?: string;
  ActionDetailsAr?:string;
  ActionDetailsEn?:string;
  Responsibility?: string;
  ResponsibilityName:string;
  DueDate?:Date;
  StartDate?: Date;
  CompletionDate?:Date;
  Status?: number;
  StatusNameEn?:string;
  StatusNameAr?:string;
  AchievementPercentage?:number;
  AttachmentId?: string;
  AttachmentDto?: AttachmentDto;
}

export interface RiskTreatmentPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  RiskOpportunityId?: string;
}
