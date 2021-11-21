import { mapEnumToOptions } from '@abp/ng.core';

export enum ImplementedType {
  NotImplemented = 0,
  PartialImplemented = 1,
  Implemented = 2,
}

export const implementedTypeOptions = mapEnumToOptions(ImplementedType);
