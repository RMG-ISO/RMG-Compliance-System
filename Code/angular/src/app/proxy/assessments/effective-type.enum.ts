import { mapEnumToOptions } from '@abp/ng.core';

export enum EffectiveType {
  NotEffective = 0,
  PartialEffective = 1,
  Effective = 2,
}

export const effectiveTypeOptions = mapEnumToOptions(EffectiveType);
