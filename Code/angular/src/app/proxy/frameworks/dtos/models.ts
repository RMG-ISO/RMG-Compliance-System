import type { SharedStatus } from '../../shared/shared-status.enum';
import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.identity';

export interface CreateUpdateFrameworkDto {
  nameAr?: string;
  nameEn?: string;
  shortcutAr?: string;
  shortcutEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  status: SharedStatus;
}

export interface FrameworkDto extends FullAuditedEntityWithUserDto<string, IdentityUserDto> {
  nameAr?: string;
  nameEn?: string;
  shortcutAr?: string;
  shortcutEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  status: SharedStatus;
}

export interface FrameworkPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
}
