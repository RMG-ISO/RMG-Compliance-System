import type { Priority } from '../priority.enum';
import type { Status } from '../status.enum';
import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { NotificationType } from '../notification-type.enum';
import type { NotySource } from '../noty-source.enum';

export interface CreateUpdateNotificationDto {
  displayName?: string;
  from?: string;
  to?: string;
  replyTo?: string;
  cc?: string;
  subject?: string;
  priority?: Priority;
  type: any;
  status: Status;
  sendDate?: string;
  body?: string;
  isHTML: boolean;
  isSSL: boolean;
  attachments?: string;
}

export interface NotificationDto extends FullAuditedEntityDto<string> {
  displayName?: string;
  from?: string;
  to?: string;
  replyTo?: string;
  cc?: string;
  subject?: string;
  priority?: Priority;
  type: NotificationType;
  status: Status;
  sendDate?: string;
  body?: string;
  isHTML: boolean;
  isSSL: boolean;
  attachments?: string;
  url?: string;
  source?: NotySource;
  referenceId?: string;
  sourceIsDeleted: boolean;
}

export interface NotificationPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  body?: string;
  creationTime?: string;
  source?: NotySource;
}

export interface NotifyUserDto {
  unReadNotifications: number;
  notifications: NotifyUserNotificationDto[];
}

export interface NotifyUserNotificationDto {
  id?: string;
  title?: string;
  url?: string;
  status: Status;
}
