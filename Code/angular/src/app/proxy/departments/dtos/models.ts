import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { IdentityUserDto } from '../../volo/abp/identity/models';

export interface DepartmentDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  name?: string;
}

export interface CreateUpdateDepartmentDto {
  name?: string;
}

export interface DepartmentPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
}
