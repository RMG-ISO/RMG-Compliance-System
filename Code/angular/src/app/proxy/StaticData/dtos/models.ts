import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.account';

export interface CreateUpdateStaticDataDto {
  NameAr?: string;
  NameEn?: string;
  TenantId?: string;
  Type?: number;

}

export interface StaticDataDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  NameAr?: string;
  NameEn?: string;
  TenantId?: string;
  Type?: number;
}

export interface StaticDataPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
  Type?: string;
}
