import { mapEnumToOptions } from '@abp/ng.core';

export enum NotificationType {
  Email = 0,
  Push = 1,
  SMS = 2,
}

export const notificationTypeOptions = mapEnumToOptions(NotificationType);
