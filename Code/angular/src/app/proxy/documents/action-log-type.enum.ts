import { mapEnumToOptions } from '@abp/ng.core';

export enum ActionLogType {
  NoAction = 0,
  ReturnToCreator = 1,
  Finish = 2,
  Approve = 3,
}

export const actionLogTypeOptions = mapEnumToOptions(ActionLogType);
