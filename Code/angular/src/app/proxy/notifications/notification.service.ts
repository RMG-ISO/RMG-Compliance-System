import type { CreateUpdateNotificationDto, NotificationDto, NotificationPagedAndSortedResultRequestDto, NotifyUserDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  apiName = 'Default';

  create = (input: CreateUpdateNotificationDto) =>
    this.restService.request<any, NotificationDto>({
      method: 'POST',
      url: '/api/app/notification',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/notification/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, NotificationDto>({
      method: 'GET',
      url: `/api/app/notification/${id}`,
    },
    { apiName: this.apiName });

  getCurrentUserNotification = () =>
    this.restService.request<any, NotifyUserDto>({
      method: 'GET',
      url: '/api/app/notification/current-user-notification',
    },
    { apiName: this.apiName });

  getList = (input: NotificationPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<NotificationDto>>({
      method: 'GET',
      url: '/api/app/notification',
      params: { body: input.body, creationTime: input.creationTime, source: input.source, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getListCurrentUserNotifications = (input: NotificationPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<NotificationDto>>({
      method: 'GET',
      url: '/api/app/notification/current-user-notifications',
      params: { body: input.body, creationTime: input.creationTime, source: input.source, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  markAsSeenById = (id: string) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/notification/${id}/mark-as-seen`,
    },
    { apiName: this.apiName });

  sendNotifications = () =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/notification/send-notifications',
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateNotificationDto) =>
    this.restService.request<any, NotificationDto>({
      method: 'PUT',
      url: `/api/app/notification/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
