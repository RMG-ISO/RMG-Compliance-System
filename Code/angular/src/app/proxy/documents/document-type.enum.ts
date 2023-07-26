import { mapEnumToOptions } from '@abp/ng.core';

export enum DocumentType {
  Policy = 1,
  Procedure = 2,
  Plan = 3,
  Strategy = 4,
}

export const documentTypeOptions = mapEnumToOptions(DocumentType);
