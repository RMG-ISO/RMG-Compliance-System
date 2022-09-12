import { mapEnumToOptions } from '@abp/ng.core';

export enum Type {
  Email = 0,
  Push = 1,
  SMS = 2,
}

export const typeOptions = mapEnumToOptions(Type);
