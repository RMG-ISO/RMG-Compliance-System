import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.account';


export interface CreateUpdateFrameworkEmployeeDto {
  FrameworkEmployeeId?: string;
  EmployeeId ?: string;

}


export interface FrameworkEmployeeDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  FrameworkEmployeeId?: string;
  EmployeeId ?: string;
}

export interface FrameworkEmployeePagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  FrameworkEmployeeId?: string;
  EmployeeId ?: string;
}
export interface getFrameworkEmployeeDto {
  FrameworkEmployeeId?: string;
}

