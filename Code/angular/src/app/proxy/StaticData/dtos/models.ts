import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.account';

export interface CreateUpdateStaticDataDto {
  NameAr?: string;
  NameEn?: string;
  ParentId?: string;
  TenantId?: string;
  Type?: number;

}

export interface StaticDataDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  NameAr?: string;
  NameEn?: string;
  ParentId?: string;
  TenantId?: string;
  Type?: number;
}
export interface getTypeDto  {
  Id?:number;
  NameAr?: string;
  NameEn?: string;

}

export interface StaticDataPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
  ParentId?: string;
  Type?: string;
}
