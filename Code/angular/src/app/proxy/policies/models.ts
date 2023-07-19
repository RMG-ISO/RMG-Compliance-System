import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { PolicyType } from './policy-type.enum';
import type { PolicyStatus } from './policy-status.enum';

export interface CreatePolicyDto extends EntityDto {
  nameEn?: string;
  nameAr?: string;
  description?: string;
  type: PolicyType;
  ownersIds: string[];
  reviewersIds: string[];
  approversIds: string[];
  categoryIds: string[];
  employeesIds: string[];
}

export interface GetListPoliciesDto extends PagedAndSortedResultRequestDto {
  status: PolicyStatus;
  type: PolicyType;
}

export interface PolicyDto extends EntityDto<string> {
  code?: string;
  name?: string;
  type: PolicyType;
  ownersIds: string[];
  reviewersIds: string[];
  approversIds: string[];
  validationStartDate?: string;
  validationEndtDate?: string;
  compliancePercentage: number;
  status: PolicyStatus;
  description?: string;
  policyCategoriesIds: string[];
}

export interface UpdatePolicyDto extends EntityDto<string> {
  name: string;
  type: PolicyType;
  ownersIds: string[];
  reviewersIds: string[];
  approversIds: string[];
  validationStartDate?: string;
  validationEndtDate?: string;
  description: string;
}
