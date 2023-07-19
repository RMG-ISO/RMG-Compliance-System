import { mapEnumToOptions } from '@abp/ng.core';

export enum PolicyStatus {
  Draft = 0,
  UnderReview = 1,
  Accepted = 2,
  ReturnToCreator = 3,
  Approved = 4,
  Published = 5,
  Acknowledgment = 6,
  Implemented = 7,
  UnderMonitoring = 8,
  Retired = 9,
}

export const policyStatusOptions = mapEnumToOptions(PolicyStatus);
