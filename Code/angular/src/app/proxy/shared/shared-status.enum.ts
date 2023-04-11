import { mapEnumToOptions } from '@abp/ng.core';

export enum SharedStatus {
  Inactive = 0,
  Active = 1,
}
export enum SharedFrameworkStatus {
  NewFramework=1,
  UnderReview=2,
  UnderApproval=3,
  Approved=4
}

export const sharedStatusOptions = mapEnumToOptions(SharedStatus);
export const sharedFrameworkStatusOptions = mapEnumToOptions(SharedFrameworkStatus);
