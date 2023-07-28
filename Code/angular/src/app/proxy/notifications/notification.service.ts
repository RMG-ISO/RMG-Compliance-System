import type { CreateUpdateNotificationDto, NotificationDto, NotificationPagedAndSortedResultRequestDto, NotifyUserDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  apiName = 'Default';
  

  create = (input: CreateUpdateNotificationDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NotificationDto>({
      method: 'POST',
      url: '/api/app/notification',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/notification/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NotificationDto>({
      method: 'GET',
      url: `/api/app/notification/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getCurrentUserNotification = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, NotifyUserDto>({
      method: 'GET',
      url: '/api/app/notification/current-user-notification',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: NotificationPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<NotificationDto>>({
      method: 'GET',
      url: '/api/app/notification',
      params: { body: input.body, creationTime: input.creationTime, source: input.source, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListCurrentUserNotifications = (input: NotificationPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<NotificationDto>>({
      method: 'GET',
      url: '/api/app/notification/current-user-notifications',
      params: { body: input.body, creationTime: input.creationTime, source: input.source, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListRiskByFilter = (input: NotificationPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<NotificationDto>>({
      method: 'GET',
      url: '/api/app/notification/risk-by-filter',
      params: { body: input.body, creationTime: input.creationTime, source: input.source, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getURI = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'GET',
      responseType: 'text',
      url: '/api/app/notification/u-rI',
    },
    { apiName: this.apiName,...config });
  

  markAsSeenById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/notification/${id}/mark-as-seen`,
    },
    { apiName: this.apiName,...config });
  

  notifictionUserByUserToNotify = (userToNotify: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/notification/notifiction-user',
      params: { userToNotify },
    },
    { apiName: this.apiName,...config });
  

  sendMailByMailToAndSubjectAndBodyAndIsHTML = (MailTo: string, subject: string, body: string, IsHTML: boolean, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/notification/send-mail',
      params: { mailTo: MailTo, subject, body, isHTML: IsHTML },
    },
    { apiName: this.apiName,...config });
  

  sendNotifications = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/notification/send-notifications',
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateNotificationDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NotificationDto>({
      method: 'PUT',
      url: `/api/app/notification/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
