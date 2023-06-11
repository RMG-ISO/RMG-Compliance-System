import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

export interface CreateUpdateDepartmentDto {
  name?: string;
}

export interface DepartmentDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  name?: string;
}

export interface DepartmentPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
}
