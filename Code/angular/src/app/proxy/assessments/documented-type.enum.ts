import { mapEnumToOptions } from '@abp/ng.core';

export enum DocumentedType {
  NotDocumented = 0,
  PartialDocumented = 1,
  Documented = 2,
}

export const documentedTypeOptions = mapEnumToOptions(DocumentedType);
