import type { CreateUpdateEmailTemplateDto, EmailTemplateDto, EmailTemplatePagedAndSortedResultRequestDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailTemplateService {
  apiName = 'Default';
  

  create = (input: CreateUpdateEmailTemplateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EmailTemplateDto>({
      method: 'POST',
      url: '/api/app/email-template',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/email-template/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EmailTemplateDto>({
      method: 'GET',
      url: `/api/app/email-template/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: EmailTemplatePagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<EmailTemplateDto>>({
      method: 'GET',
      url: '/api/app/email-template',
      params: { key: input.key, subject: input.subject, search: input.search, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListDeleted = (input: EmailTemplatePagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<EmailTemplateDto>>({
      method: 'GET',
      url: '/api/app/email-template/deleted',
      params: { key: input.key, subject: input.subject, search: input.search, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateEmailTemplateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EmailTemplateDto>({
      method: 'PUT',
      url: `/api/app/email-template/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
