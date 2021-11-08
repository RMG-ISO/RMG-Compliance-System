import { mapEnumToOptions } from '@abp/ng.core';

export enum SharedStatus {
  Inactive = 0,
  Active = 1,
}

export const sharedStatusOptions = mapEnumToOptions(SharedStatus);
