import { IdentityUserDto } from '@abp/ng.account';
import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { SharedStatus } from '../../shared/shared-status.enum';

export interface ControlDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  nameAr?: string;
  nameEn?: string;
  compliancePercentage?: number;
  descriptionAr?: string;
  descriptionEn?: string;
  reference?: string;
  status: SharedStatus;
  parentId?: string;
  domainId?: string;
}

export interface ControlPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  mainControlId?: string;
  isMainControl: boolean;
  search?: string;
  status?: SharedStatus;
  domainId?: string;
  frameWorkId?: string;
}

export interface CreateUpdateControlDto {
  nameAr?: string;
  nameEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  reference?: string;
  status: SharedStatus;
  parentId?: string;
  domainId?: string;
}
