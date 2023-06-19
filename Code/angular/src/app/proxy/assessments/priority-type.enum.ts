import { mapEnumToOptions } from '@abp/ng.core';

export enum PriorityType {
  Priority1 = 1,
  Priority2 = 2,
  Priority3 = 3,
}

export const priorityTypeOptions = mapEnumToOptions(PriorityType);
