import type { CreateUpdateInternalAuditQuestionDto, InternalAuditQuestionDto, InternalAuditQuestionPagedAndSortedResultRequestDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type {PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RiskTreatmentService {
  apiName = 'Default';

  create = (input: CreateUpdateInternalAuditQuestionDto) =>
    this.restService.request<any, InternalAuditQuestionDto>({
      method: 'POST',
      url: '/api/app/internal-audit-question',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/internal-audit-question/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, InternalAuditQuestionDto>({
      method: 'GET',
      url: `/api/app/internal-audit-question/${id}`,
    },
    { apiName: this.apiName });



  update = (id: string, input: CreateUpdateInternalAuditQuestionDto) =>
    this.restService.request<any, InternalAuditQuestionDto>({
      method: 'PUT',
      url: `/api/app/internal-audit-question/${id}`,
      body: input,
    },
    { apiName: this.apiName });


    getList = (input: InternalAuditQuestionPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<InternalAuditQuestionDto>>({
      method: 'GET',
      url: '/api/app/internal-audit-question',
      params: {Search:input.Search, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });






  constructor(private restService: RestService) {}
}
