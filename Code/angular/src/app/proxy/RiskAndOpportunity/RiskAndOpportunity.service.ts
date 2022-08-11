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
      url: '/api/app/document/document-by-category',
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
    createCategory = (input: CreateUpdateHistoryRiskAndOpportunityDto) =>
    this.restService.request<any, HistoryRiskAndOpportunityDto>({
      method: 'POST',
      url: '/api/app/document-category',
      body: input,
    },
    { apiName: this.apiName });

  deleteCategory = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/document-category/${id}`,
    },
    { apiName: this.apiName });

  getCategory = (id: string) =>
    this.restService.request<any, HistoryRiskAndOpportunityDto>({
      method: 'GET',
      url: `/api/app/document-category/${id}`,
    },
    { apiName: this.apiName });


  getListCategory = (input: HistoryRiskOpportunityPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<HistoryRiskOpportunityPagedAndSortedResultRequestDto>>({
      method: 'GET',
      url: '/api/app/document-category/get-document-categories',
      params: { search: input.search,userId: input.userId,riskOpportunityId: input.riskOpportunityId,sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  updateCategory = (id: string, input: CreateUpdateHistoryRiskAndOpportunityDto) =>
    this.restService.request<any, HistoryRiskAndOpportunityDto>({
      method: 'PUT',
      url: `/api/app/document-category/${id}`,
      body: input,
    },
    { apiName: this.apiName });






  constructor(private restService: RestService) {}
}
