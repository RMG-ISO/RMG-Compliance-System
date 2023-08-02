import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { IdentityUserDto } from '../../volo/abp/identity/models';

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
