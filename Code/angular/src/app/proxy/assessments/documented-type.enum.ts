import { mapEnumToOptions } from '@abp/ng.core';

export enum DocumentedType {
  NotDocumented = 0,
  Documented = 1,
}

export const documentedTypeOptions = mapEnumToOptions(DocumentedType);
