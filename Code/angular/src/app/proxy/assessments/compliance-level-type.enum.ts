import { mapEnumToOptions } from '@abp/ng.core';

export enum ComplianceLevelType {
  ComplianceLevel1 = 1,
  ComplianceLevel2 = 2,
  ComplianceLevel3 = 3,
  ComplianceLevel4 = 4,
  ComplianceLevel5 = 5,
}

export const complianceLevelTypeOptions = mapEnumToOptions(ComplianceLevelType);
