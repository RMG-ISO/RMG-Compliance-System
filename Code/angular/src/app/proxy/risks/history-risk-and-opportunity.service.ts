import type { HistoryRiskAndOpportunityDto, HistoryRiskOpportunityPagedAndSortedResultRequestDto } from './dtos/models';
import type { CreateUpdateHistoryRiskAndOpportunityDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HistoryRiskAndOpportunityService {
  apiName = 'Default';
  

  create = (input: CreateUpdateHistoryRiskAndOpportunityDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HistoryRiskAndOpportunityDto>({
      method: 'POST',
      url: '/api/app/history-risk-and-opportunity',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/history-risk-and-opportunity/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HistoryRiskAndOpportunityDto>({
      method: 'GET',
      url: `/api/app/history-risk-and-opportunity/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: HistoryRiskOpportunityPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<HistoryRiskAndOpportunityDto>>({
      method: 'GET',
      url: '/api/app/history-risk-and-opportunity',
      params: { search: input.search, workFlowStages: input.workFlowStages, riskOpportunityId: input.riskOpportunityId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListHistoryByFilter = (input: HistoryRiskOpportunityPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<HistoryRiskAndOpportunityDto>>({
      method: 'GET',
      url: '/api/app/history-risk-and-opportunity/history-by-filter',
      params: { search: input.search, workFlowStages: input.workFlowStages, riskOpportunityId: input.riskOpportunityId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateHistoryRiskAndOpportunityDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HistoryRiskAndOpportunityDto>({
      method: 'PUT',
      url: `/api/app/history-risk-and-opportunity/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
