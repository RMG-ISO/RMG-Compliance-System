import { mapEnumToOptions } from '@abp/ng.core';

export enum ComplianceStatus {
  NotStarted = 0,
  UnderPreparation = 1,
}

export const complianceStatusOptions = mapEnumToOptions(ComplianceStatus);
