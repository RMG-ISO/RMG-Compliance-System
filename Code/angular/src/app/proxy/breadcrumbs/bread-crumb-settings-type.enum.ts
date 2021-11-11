import { mapEnumToOptions } from '@abp/ng.core';

export enum BreadCrumbSettingsType {
  Framework = 0,
  MainDomain = 1,
  SubDomain = 2,
  MainControl = 3,
  SubControl = 4,
}

export const breadCrumbSettingsTypeOptions = mapEnumToOptions(BreadCrumbSettingsType);
