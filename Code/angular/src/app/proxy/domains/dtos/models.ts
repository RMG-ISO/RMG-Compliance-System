import type { SharedStatus } from '../../shared/shared-status.enum';
import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.account';

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

export interface DomainDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  nameAr?: string;
  nameEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  reference?: string;
  status: SharedStatus;
  parentId?: string;
  frameworkId?: string;
  departmentId?: string;
  departmentName?: string;
}

export interface DomainPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  mainDomainId?: string;
  isMainDomain: boolean;
  search?: string;
}
