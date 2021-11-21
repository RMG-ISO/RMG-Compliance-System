import { mapEnumToOptions } from '@abp/ng.core';

export enum ApplicableType {
  NotApplicable = 0,
  Applicable = 1,
}

export const applicableTypeOptions = mapEnumToOptions(ApplicableType);
