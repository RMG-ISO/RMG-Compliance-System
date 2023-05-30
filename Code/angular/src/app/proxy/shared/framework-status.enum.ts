import { mapEnumToOptions } from '@abp/ng.core';

export enum FrameworkStatus {
  NewFramework = 0,
  UnderReview = 1,
  UnderApproval = 2,
  Approved = 3,
  ReturnedToCreator = 4,
}

export const frameworkStatusOptions = mapEnumToOptions(FrameworkStatus);
