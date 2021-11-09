import { IdentityUserDto } from '@abp/ng.account';
import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateUpdateEmployeeDto {
  fullName?: string;
  email?: string;
  departmentId?: string;
  isManager: boolean;
}

export interface EmployeeDto extends FullAuditedEntityWithUserDto<string, IdentityUserDto> {
  fullName?: string;
  email?: string;
  departmentId?: string;
  isManager: boolean;
  departmentName?: string;
}

export interface EmployeePagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
}