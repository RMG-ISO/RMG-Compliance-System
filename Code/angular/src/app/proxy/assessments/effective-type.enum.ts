import { mapEnumToOptions } from '@abp/ng.core';

export enum EffectiveType {
  NotEffective = 0,
  Effective = 1,
}

export const effectiveTypeOptions = mapEnumToOptions(EffectiveType);
