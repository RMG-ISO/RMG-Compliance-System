import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.identity/proxy';
import type { SharedStatus } from '../../shared/shared-status.enum';
import type { FrameworkStatus } from '../../shared/framework-status.enum';
import type { ComplianceStatus } from '../../shared/compliance-status.enum';
import type { FrameworkChangeStatusLogDto } from '../models';
import type { ControlDto } from '../../controls/dtos/models';
import type { AssessmentDto } from '../../assessments/dtos/models';
import type { DomainDto } from '../../domains/dtos/models';

export interface FrameworkDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  managementName?: string;
  reviewUserName?: string;
  ownerName?: string;
  nameAr?: string;
  nameEn?: string;
  shortcutAr?: string;
  shortcutEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  managementId?: string;
  status: SharedStatus;
  frameworkStatus: FrameworkStatus;
  attachmentId?: string;
  reviewUserId?: string;
  approveUserId?: string;
  approveUserName?: string;
  levelFirstNameAr?: string;
  levelFirstNameEn?: string;
  levelSecondNameAr?: string;
  levelSecondNameEn?: string;
  levelThirdNameAr?: string;
  levelThirdNameEn?: string;
  ownerId?: string;
  levelFourNameAr?: string;
  levelFourNameEn?: string;
  hasMainControl: boolean;
  complianceStatus: ComplianceStatus;
  selfAssessmentStartDate?: string;
  selfAssessmentEndDate?: string;
  hasPriority: boolean;
  canSendForInternalAssessment: boolean;
  canApproveCompliance: boolean;
  internalAssessmentStartDate?: string;
  internalAssessmentEndDate?: string;
  reviewStartDate?: string;
  reviewEndDate?: string;
  approvalStartDate?: string;
  approvalEndDate?: string;
  complianceReviewStartDate?: string;
  complianceReviewEndDate?: string;
  compliancePercentage: number;
  frameworkEmpsDto: FrameworkEmpDto[];
  changeStatusLogs: FrameworkChangeStatusLogDto[];
}

export interface FrameworkEmpDto {
  frameworkId?: string;
  employeeId?: string;
  employeeName?: string;
}

export interface CreateUpdateFrameworkDto {
  nameAr?: string;
  nameEn?: string;
  shortcutAr?: string;
  shortcutEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  managementId?: string;
  ownerId?: string;
  attachmentId?: string;
  reviewUserId?: string;
  approveUserId?: string;
  levelFirstNameAr?: string;
  levelFirstNameEn?: string;
  levelSecondNameAr?: string;
  levelSecondNameEn?: string;
  levelThirdNameAr?: string;
  levelThirdNameEn?: string;
  levelFourNameAr?: string;
  levelFourNameEn?: string;
  hasPriority: boolean;
  frameworkEmpsDto: FrameworkEmpDto[];
}

export interface FrameworkData {
  totalApplicable: number;
  totalNotApplicable: number;
  frameworkDto: FrameworkDto;
  domainDta: MainDomainsDto[];
}

export interface FrameworkPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
  status?: SharedStatus;
  frameworkStatus?: FrameworkStatus;
}

export interface MainControlsDto {
  mainControl: ControlDto;
  subControl: SubControlsDto[];
  assessmentDto: AssessmentDto;
}

export interface MainDomainsDto {
  levelOne: number;
  levelTwo: number;
  levelThree: number;
  levelfour: number;
  levelFive: number;
  maindomain: DomainDto;
  childrenDomains: SubDomainsDto[];
}

export interface RejectFrameworkDto {
  reason?: string;
}

export interface SubControlsDto {
  subControl: ControlDto;
  assessmentDto: AssessmentDto;
}

export interface SubDomainsDto {
  subdomain: DomainDto;
  childrenControls: MainControlsDto[];
}

export interface TogglePriorityOutputDto {
  hasPriority: boolean;
}

export interface getFrameworkDto {
  frameworkId?: string;
}
