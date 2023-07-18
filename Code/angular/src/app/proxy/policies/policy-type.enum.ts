import { mapEnumToOptions } from '@abp/ng.core';

export enum PolicyType {
  Policy = 1,
  Procedure = 2,
  Plan = 3,
  Strategy = 4,
}

export const policyTypeOptions = mapEnumToOptions(PolicyType);
