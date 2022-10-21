import type { CreateUpdateInternalAuditMenuQuestionDto, InternalAuditMenuQuestionDto, InternalAuditMenuQuestionPagedAndSortedResultRequestDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type {PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RiskTreatmentService {
  apiName = 'Default';

  create = (input: CreateUpdateInternalAuditMenuQuestionDto) =>
    this.restService.request<any, InternalAuditMenuQuestionDto>({
      method: 'POST',
      url: '/api/app/internal-audit-question-list',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/internal-audit-question-list/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, InternalAuditMenuQuestionDto>({
      method: 'GET',
      url: `/api/app/internal-audit-question-list/${id}`,
    },
    { apiName: this.apiName });



  update = (id: string, input: CreateUpdateInternalAuditMenuQuestionDto) =>
    this.restService.request<any, InternalAuditMenuQuestionDto>({
      method: 'PUT',
      url: `/api/app/internal-audit-question-list/${id}`,
      body: input,
    },
    { apiName: this.apiName });


    getList = (input: InternalAuditMenuQuestionPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<InternalAuditMenuQuestionDto>>({
      method: 'GET',
      url: '/api/app/internal-audit-question-list',
      params: {Search:input.Search, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

    getQuestionByID = (input: InternalAuditMenuQuestionPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<InternalAuditMenuQuestionDto>>({
      method: 'GET',
      url: '/api/app/internal-audit-question-list/question-by-id',
      params: {InternalAuditMenuQuestionId:input.InternalAuditMenuQuestionId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });




  constructor(private restService: RestService) {}
}
