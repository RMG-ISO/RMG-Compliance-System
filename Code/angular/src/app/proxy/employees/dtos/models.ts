import { IdentityUserDto } from '@abp/ng.identity/proxy';
import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateUpdateEmployeeDto {
  fullName?: string;
  email?: string;
  departmentId?: string;
  isManager: boolean;
}

export interface EmployeeDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  fullName?: string;
  email?: string;
  departmentId?: string;
  isManager: boolean;
  isUse: boolean;
  departmentName?: string;
}

export interface EmployeePagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
}
