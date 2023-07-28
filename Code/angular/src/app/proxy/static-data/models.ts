import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

export interface CreateUpdateStaticDataDto {
  nameEn?: string;
  nameAr?: string;
  parentId?: string;
  type: number;
  tenantId?: string;
}

export interface StaticDataDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  nameEn?: string;
  nameAr?: string;
  parentId?: string;
  type: number;
  typeName?: string;
  tenantId?: string;
}

export interface StaticDataPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
  parentId?: string;
  type?: number;
}

export interface getEnumTypeStaticData {
  id: number;
  nameEn?: string;
  nameAr?: string;
}

export interface getMatrix {
  likehood: getEnumTypeStaticData[];
  impact: getEnumTypeStaticData[];
}
