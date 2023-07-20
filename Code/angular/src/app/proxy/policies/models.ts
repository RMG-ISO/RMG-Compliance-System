import type { EntityDto, FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { PolicyType } from './policy-type.enum';
import type { PolicyStatus } from './policy-status.enum';

export interface CategoryDto extends EntityDto<string> {
  nameEn?: string;
  nameAr?: string;
}

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

export interface PolicyDto extends FullAuditedEntityDto<string> {
  code?: string;
  nameEn?: string;
  nameAr?: string;
  type: PolicyType;
  ownersIds: string[];
  reviewersIds: string[];
  approversIds: string[];
  validationStartDate?: string;
  validationEndtDate?: string;
  compliancePercentage: number;
  status: PolicyStatus;
  description?: string;
  categoryIds: string[];
}

export interface UpdatePolicyDto extends EntityDto<string> {
  nameEn: string;
  nameAr: string;
  type: PolicyType;
  ownersIds: string[];
  reviewersIds: string[];
  approversIds: string[];
  validationStartDate: string;
  validationEndtDate: string;
  description: string;
}
