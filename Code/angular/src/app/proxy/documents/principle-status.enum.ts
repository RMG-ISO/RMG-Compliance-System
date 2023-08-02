import { mapEnumToOptions } from '@abp/ng.core';

export enum PrincipleStatus {
  NotApplicable = 0,
  NotComply = 1,
  PartiallyComply = 2,
  Comply = 3,
}

export const principleStatusOptions = mapEnumToOptions(PrincipleStatus);
