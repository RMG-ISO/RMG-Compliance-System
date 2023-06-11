import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

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
  departmentName?: string;
}

export interface EmployeePagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
}
