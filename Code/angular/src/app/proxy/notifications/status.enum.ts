import { mapEnumToOptions } from '@abp/ng.core';

export enum Status {
  Created = 0,
  Fail = 1,
  Success = 2,
  Seen = 3,
  NotSeen = 4,
}

export const statusOptions = mapEnumToOptions(Status);
