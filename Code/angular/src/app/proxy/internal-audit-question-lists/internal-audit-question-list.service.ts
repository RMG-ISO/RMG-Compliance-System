import type { InternalAuditQuestionListPagedAndSortedResultRequestDto } from './footer/dto/models';
import type { CreateUpdateInternalAuditMenuQuestionDto, InternalAuditMenuQuestionDto, InternalAuditMenuQuestionPagedAndSortedResultRequestDto } from './header/dto/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { InternalAuditQuestionDto } from '../internal-audit-questions/models';

@Injectable({
  providedIn: 'root',
})
export class InternalAuditQuestionListService {
  apiName = 'Default';
  

  create = (input: CreateUpdateInternalAuditMenuQuestionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InternalAuditMenuQuestionDto>({
      method: 'POST',
      url: '/api/app/internal-audit-question-list',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/internal-audit-question-list/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InternalAuditMenuQuestionDto>({
      method: 'GET',
      url: `/api/app/internal-audit-question-list/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: InternalAuditMenuQuestionPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<InternalAuditMenuQuestionDto>>({
      method: 'GET',
      url: '/api/app/internal-audit-question-list',
      params: { search: input.search, frameworkId: input.frameworkId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListQuestionByFilter = (input: InternalAuditMenuQuestionPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<InternalAuditMenuQuestionDto>>({
      method: 'GET',
      url: '/api/app/internal-audit-question-list/question-by-filter',
      params: { search: input.search, frameworkId: input.frameworkId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListQuestionByFramework = (input: InternalAuditMenuQuestionPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<InternalAuditQuestionDto>>({
      method: 'GET',
      url: '/api/app/internal-audit-question-list/question-by-framework',
      params: { search: input.search, frameworkId: input.frameworkId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListQuestionById = (input: InternalAuditQuestionListPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<InternalAuditQuestionDto>>({
      method: 'GET',
      url: '/api/app/internal-audit-question-list/question-by-id',
      params: { search: input.search, internalAuditMenuQuestionId: input.internalAuditMenuQuestionId, internalAuditQuestionId: input.internalAuditQuestionId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getMenuQuestionById = (Id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InternalAuditMenuQuestionDto>({
      method: 'GET',
      url: `/api/app/internal-audit-question-list/menu-question-by-id/${Id}`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateInternalAuditMenuQuestionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InternalAuditMenuQuestionDto>({
      method: 'PUT',
      url: `/api/app/internal-audit-question-list/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
