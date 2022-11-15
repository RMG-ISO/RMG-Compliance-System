import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

import { IdentityUserDto } from '@abp/ng.account';

export interface CreateUpdateInternalAuditPreparationDto {
  AuditCode?: string;
  AuditTitleEn?: string;
  AuditTitleAr?: string;
  AuditDescriptionEn?:string;
  AuditDescriptionAr?:string;
  AuditFieldEn?:string;
  AuditFieldAr?:string;
  AuditSetpsEn?:string;
  AuditSetpsAr?:string;
  AuditGoalsEn?:string;
  AuditGoalsAr?:string;
  DepartmentId?:string;
  StartDate?:Date;
  EndDate?:Date;
  RiskOpportunityId?:string;
  RiskOpportunityIds?:string[];
  FrameworkId?:string;
  Auditors?:InternalAuditorDto[];

  IsApprove  ?:boolean;
  approveDate ?:Date;
 ApproveBy ?:string;
 CausesRefuse?:string;


}

export interface InternalAuditorDto{
  InternalAuditPreparationId?: string;
  UserId?: string;
  DepartmentId?: string;
  IsAuditor?:boolean;
}

export interface AuditorDto{
  InternalAuditPreparationId?: string;
  UserId?: string;
  IsAuditor?:boolean;
}

export interface InternalAuditPreparationDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  AuditCode?: string;
  AuditTitleEn?: string;
  AuditTitleAr?: string;
  AuditDescriptionEn?:string;
  AuditDescriptionAr?:string;
  AuditFieldEn?:string;
  AuditFieldAr?:string;
  AuditSetpsEn?:string;
  AuditSetpsAr?:string;
  AuditGoalsEn?:string;
  AuditGoalsAr?:string;
  DepartmentId?:string;
  StartDate?:Date;
  EndDate?:Date;
  RiskOpportunityId?:string;
  RiskOpportunityIds?:string[];
  FrameworkId?:string;
  AuditorDeptDto?:InternalAuditorDto[];
  AuditorDto?:AuditorDto[];
  IsApprove  ?:boolean;
  approveDate ?:Date;
 ApproveBy ?:string;
 CausesRefuse?:string;
}

export interface InternalAuditPreparationPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  Search?: string;
  FrameworkId?: string;
  DepartmentId ?: string;
  IsApprove  ?:boolean;
  approveDate ?:Date;
 ApproveBy ?:string;
}
