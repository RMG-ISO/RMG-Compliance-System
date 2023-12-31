import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { IdentityUserDto } from '../../volo/abp/identity/models';
import type { SharedStatus } from '../../shared/shared-status.enum';

export interface ControlDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  subControlsCount: number;
  nameAr?: string;
  nameEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  reference?: string;
  status: SharedStatus;
  parentId?: string;
  mainControlNameAr?: string;
  mainControlNameEn?: string;
  domainId?: string;
  compliancePercentage: number;
}

export interface ControlLookupPagedResultRequestDto {
  maxResultCount: number;
  skipCount: number;
  search?: string;
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
