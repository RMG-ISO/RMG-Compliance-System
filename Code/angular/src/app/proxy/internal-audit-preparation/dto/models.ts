import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { IdentityUserDto } from '../../volo/abp/identity/models';
import type { DepartmentDto } from '../../departments/dtos/models';
import type { RiskAndOpportunityDto } from '../../risks/dtos/models';
import type { FrameworkDto } from '../../frameworks/dtos/models';

export interface AuditorDto {
  internalAuditPreparationId?: string;
  userId?: string;
  isAuditor: boolean;
}

export interface InternalAuditPreparationDto extends FullAuditedEntityWithUserDto<string, IdentityUserDto> {
  auditCode?: string;
  auditTitleEn?: string;
  auditTitleAr?: string;
  auditDescriptionEn?: string;
  auditDescriptionAr?: string;
  auditFieldEn?: string;
  auditFieldAr?: string;
  auditSetpsEn?: string;
  auditSetpsAr?: string;
  auditGoalsEn?: string;
  auditGoalsAr?: string;
  departmentId?: string;
  department: DepartmentDto;
  startDate?: string;
  endDate?: string;
  riskOpportunityId?: string;
  riskOpportunityIds: string[];
  riskOpportunity: RiskAndOpportunityDto;
  frameworkId?: string;
  framework: FrameworkDto;
  auditorDto: AuditorDto[];
  auditorDeptDto: InternalAuditorDto[];
  isApprove?: boolean;
  approveDate?: string;
  approveBy?: string;
  causesRefuse?: string;
}

export interface InternalAuditorDto {
  internalAuditPreparationId?: string;
  userId?: string;
  departmentId?: string;
  isAuditor: boolean;
}

export interface CreateUpdateInternalAuditPreparationDto {
  auditCode?: string;
  auditTitleEn?: string;
  auditTitleAr?: string;
  auditDescriptionEn?: string;
  auditDescriptionAr?: string;
  auditFieldEn?: string;
  auditFieldAr?: string;
  auditSetpsEn?: string;
  auditSetpsAr?: string;
  auditGoalsEn?: string;
  auditGoalsAr?: string;
  departmentId?: string;
  startDate?: string;
  endDate?: string;
  riskOpportunityId?: string;
  riskOpportunityIds: string[];
  frameworkId?: string;
  auditors: InternalAuditorDto[];
  isApprove?: boolean;
  approveDate?: string;
  approveBy?: string;
  causesRefuse?: string;
}

export interface InternalAuditPreparationPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
  frameworkId?: string;
  departmentId?: string;
  isApprove?: boolean;
  approveDate?: string;
  approveBy?: string;
}
