import { mapEnumToOptions } from '@abp/ng.core';

export enum DocumentSectionStatus {
  Draft = 1,
  Completed = 2,
}

export const documentSectionStatusOptions = mapEnumToOptions(DocumentSectionStatus);
