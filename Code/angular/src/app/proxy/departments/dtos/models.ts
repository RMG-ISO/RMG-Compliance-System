import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.identity';

export interface CreateUpdateDepartmentDto {
  name?: string;
}

export interface DepartmentDto extends FullAuditedEntityWithUserDto<string, IdentityUserDto> {
  name?: string;
}

export interface DepartmentPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
}
