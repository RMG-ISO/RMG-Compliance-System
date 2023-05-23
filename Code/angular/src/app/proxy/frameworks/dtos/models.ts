import type { SharedStatus, SharedFrameworkStatus } from '../../shared/shared-status.enum';
import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.account';
import type { DomainDto } from '../../domains/dtos/models';
import type { ControlDto } from '../../controls/dtos/models';
import type { AssessmentDto } from '../../assessments/dtos/models';
import type { FrameworkChangeStatusLogDto } from '../models';

export interface RejectFrameworkDto {
  reason?: string;
}

export interface CreateUpdateFrameworkDto {
  managementName?: string;
  reviewUserName?: string;
  ownerName?: string;
  nameAr?: string;
  nameEn?: string;
  shortcutAr?: string;
  shortcutEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  status: SharedStatus;
  frameworkStatus?: SharedFrameworkStatus;
  attachmentId?: string;
  ManagementId?: string;
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
  OwnerId?: string;
  FrameworkEmpDto?: FrameworkEmpDto[];
}

export interface FrameworkDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  nameAr?: string;
  nameEn?: string;
  shortcutAr?: string;
  shortcutEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  status: SharedStatus;
  frameworkStatus?: SharedFrameworkStatus;
  attachmentId?: string;
  ManagementId?: string;
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
  OwnerId?: string;
  FrameworkEmpDto?: FrameworkEmpDto[];
  changeStatusLogs: FrameworkChangeStatusLogDto[];
}

export interface FrameworkPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  FrameworkId?: string;
  search?: string;
  status?: SharedStatus;
}
export interface getFrameworkDto {
  FrameworkId?: string;
}
export interface FrameworkEmpDto {
  FrameworkId?: string;
  EmployeeId?: string;
  employeeName?: string;
}

export interface ComplainceDto {
  totalApplicable?: number;
  totalNotApplicable?: number;
  FrameworkData?: FrameworkData[];
}
export interface FrameworkData {
  FrameworkDto?: FrameworkDto;
  DomainsDta?: DomainsDta[];
}
export interface DomainsDta {
  levelOne?: number;
  levelTwo?: number;
  levelThree?: number;
  levelfour?: number;
  levelFive?: number;
  subdomain?: DomainDto;
  ChildrenControls?: ControlsDto[];
}
export interface ControlsDto {
  subControl?: ControlDto;
  AssessmentDto?: AssessmentDto;
}
