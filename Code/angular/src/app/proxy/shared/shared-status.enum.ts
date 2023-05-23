import { mapEnumToOptions } from '@abp/ng.core';

export enum SharedStatus {
  Inactive = 0,
  Active = 1,
}
export enum SharedFrameworkStatus {
  NewFramework=0,
  UnderReview=1,
  UnderApproval=2,
  Approved=3,
  ReturnedToCreator=4,
}

export const sharedStatusOptions = mapEnumToOptions(SharedStatus);
export const sharedFrameworkStatusOptions = mapEnumToOptions(SharedFrameworkStatus);
