import { mapEnumToOptions } from '@abp/ng.core';

export enum Priority {
  Normal = 0,
  Low = 1,
  High = 2,
}

export const priorityOptions = mapEnumToOptions(Priority);
