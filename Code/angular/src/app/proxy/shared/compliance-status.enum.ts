import { mapEnumToOptions } from '@abp/ng.core';

export enum ComplianceStatus {
  NotStarted = 0,
  UnderPreparation = 1,
  ReadyForInternalAssessment = 2,
  UnderInternalAssessment = 3,
  ReadyForRevision = 4,
  UnderRevision = 5,
  UnderInternalReAssessment = 6,
  UnderReRevision = 7,
}

export const complianceStatusOptions = mapEnumToOptions(ComplianceStatus);
