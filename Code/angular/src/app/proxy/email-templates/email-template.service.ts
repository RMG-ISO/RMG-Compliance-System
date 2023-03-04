import type { CreateUpdateEmailTemplateDto, EmailTemplateDto, EmailTemplatePagedAndSortedResultRequestDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailTemplateService {
  apiName = 'Default';

  create = (input: CreateUpdateEmailTemplateDto) =>
    this.restService.request<any, EmailTemplateDto>({
      method: 'POST',
      url: '/api/app/email-template',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/email-template/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, EmailTemplateDto>({
      method: 'GET',
      url: `/api/app/email-template/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: EmailTemplatePagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<EmailTemplateDto>>({
      method: 'GET',
      url: '/api/app/email-template',
      params: { key: input.key, search: input['search'], subject: input.subject, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getListDeleted = (input: EmailTemplatePagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<EmailTemplateDto>>({
      method: 'GET',
      url: '/api/app/email-template/deleted',
      params: { key: input.key, subject: input.subject, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateEmailTemplateDto) =>
    this.restService.request<any, EmailTemplateDto>({
      method: 'PUT',
      url: `/api/app/email-template/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
