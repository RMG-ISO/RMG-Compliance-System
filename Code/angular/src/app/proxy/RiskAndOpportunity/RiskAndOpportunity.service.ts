import type { CreateUpdateRiskAndOpportunityDto, RiskAndOpportunityDto, RiskOpportunityPagedAndSortedResultRequestDto,HistoryRiskAndOpportunityDto,CreateUpdateHistoryRiskAndOpportunityDto,HistoryRiskOpportunityPagedAndSortedResultRequestDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type {PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class documentService {
  apiName = 'Default';

  create = (input: CreateUpdateRiskAndOpportunityDto) =>
    this.restService.request<any, RiskAndOpportunityDto>({
      method: 'POST',
      url: '/api/app/document',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/document/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, RiskAndOpportunityDto>({
      method: 'GET',
      url: `/api/app/document/${id}`,
    },
    { apiName: this.apiName });


  getList = (input: RiskOpportunityPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<RiskAndOpportunityDto>>({
      method: 'GET',
      url: '/api/app/document/document-by-historyRisk',
      params: { search: input.search, type: input.type, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateRiskAndOpportunityDto) =>
    this.restService.request<any, RiskAndOpportunityDto>({
      method: 'PUT',
      url: `/api/app/document/${id}`,
      body: input,
    },
    { apiName: this.apiName });
   //////History Risk And Opportunity //////////////////
    createhistoryRisk = (input: CreateUpdateHistoryRiskAndOpportunityDto) =>
    this.restService.request<any, HistoryRiskAndOpportunityDto>({
      method: 'POST',
      url: '/api/app/history-risk-and-opportunity',
      body: input,
    },
    { apiName: this.apiName });

  deletehistoryRisk = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/history-risk-and-opportunity/${id}`,
    },
    { apiName: this.apiName });

  gethistoryRisk = (id: string) =>
    this.restService.request<any, HistoryRiskAndOpportunityDto>({
      method: 'GET',
      url: `/api/app/history-risk-and-opportunity/${id}`,
    },
    { apiName: this.apiName });


  getListhistoryRisk = (input: HistoryRiskOpportunityPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<HistoryRiskOpportunityPagedAndSortedResultRequestDto>>({
      method: 'GET',
      url: '/api/app/history-risk-and-opportunity/history-by-filter',
      params: { search: input.search,userId: input.userId,riskOpportunityId: input.riskOpportunityId,sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  updatehistoryRisk = (id: string, input: CreateUpdateHistoryRiskAndOpportunityDto) =>
    this.restService.request<any, HistoryRiskAndOpportunityDto>({
      method: 'PUT',
      url: `/api/app/history-risk-and-opportunity/${id}`,
      body: input,
    },
    { apiName: this.apiName });






  constructor(private restService: RestService) {}
}
