import type { InternalAuditQuestionPagedAndSortedResultRequestDto } from './dtos/models';
import type { CreateUpdateInternalAuditQuestionDto, InternalAuditQuestionDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InternalAuditQuestionService {
  apiName = 'Default';
  

  create = (input: CreateUpdateInternalAuditQuestionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InternalAuditQuestionDto>({
      method: 'POST',
      url: '/api/app/internal-audit-question',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/internal-audit-question/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InternalAuditQuestionDto>({
      method: 'GET',
      url: `/api/app/internal-audit-question/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: InternalAuditQuestionPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<InternalAuditQuestionDto>>({
      method: 'GET',
      url: '/api/app/internal-audit-question',
      params: { search: input.search, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListQuestionByFilter = (input: InternalAuditQuestionPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<InternalAuditQuestionDto>>({
      method: 'GET',
      url: '/api/app/internal-audit-question/question-by-filter',
      params: { search: input.search, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getQuestionById = (Id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InternalAuditQuestionDto>({
      method: 'GET',
      url: `/api/app/internal-audit-question/question-by-id/${Id}`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateInternalAuditQuestionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InternalAuditQuestionDto>({
      method: 'PUT',
      url: `/api/app/internal-audit-question/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
