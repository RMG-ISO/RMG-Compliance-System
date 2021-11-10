import type { SharedStatus } from '../../shared/shared-status.enum';
import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateUpdateDomainDto {
  nameAr?: string;
  nameEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  reference?: string;
  status: SharedStatus;
  parentId?: string;
  frameworkId?: string;
  departmentId?: string;
}

export interface DomainDto extends FullAuditedEntityWithUserDto<string, IdentityUserDto> {
  nameAr?: string;
  nameEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  reference?: string;
  status: SharedStatus;
  parentId?: string;
  frameworkId?: string;
  departmentId?: string;
}

export interface DomainPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  isMainDomain: boolean;
  search?: string;
}