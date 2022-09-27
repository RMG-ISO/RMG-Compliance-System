import type { CreateUpdateRiskAndOpportunityDto, RiskAndOpportunityDto,matrixModel,getMatrix,OpenCloseRiskAndOpportunityDto, RiskOpportunityPagedAndSortedResultRequestDto,HistoryRiskAndOpportunityDto,UserPagedAndSortedResultRequestDto,CreateUpdateHistoryRiskAndOpportunityDto,HistoryRiskOpportunityPagedAndSortedResultRequestDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type {PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { IdentityUserDto } from '@abp/ng.account';
import { List } from 'echarts';

@Injectable({
  providedIn: 'root',
})
export class RiskAndOpportunityService {
  apiName = 'Default';

  create = (input: CreateUpdateRiskAndOpportunityDto) =>
    this.restService.request<any, RiskAndOpportunityDto>({
      method: 'POST',
      url: '/api/app/risk-and-opportunity',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/risk-and-opportunity/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, RiskAndOpportunityDto>({
      method: 'GET',
      url: `/api/app/risk-and-opportunity/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: RiskOpportunityPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<RiskAndOpportunityDto>>({
      method: 'GET',
      url: '/api/app/risk-and-opportunity/risk-by-filter',
      params: { search: input.search, type: input.type, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });
    getListUser = (input: UserPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<IdentityUserDto>>({
      method: 'GET',
      url: '/api/identity/users',
      params: { Filter: input.Filter,sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

    getListDashboard = (input: UserPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<IdentityUserDto>>({
      method: 'GET',
      url: '/api/identity/users',
      params: { Filter: input.Filter,sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

    getOpenClose= (input: RiskOpportunityPagedAndSortedResultRequestDto) =>
    this.restService.request<any, Array<OpenCloseRiskAndOpportunityDto>>({
      method: 'GET',
      url: '/api/app/risk-and-opportunity/open-close-risks-and-opportunities',
      params: { search: input.search, type: input.type, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

    getTreatmentsDashboard= (input: RiskOpportunityPagedAndSortedResultRequestDto) =>
    this.restService.request<any, Array<OpenCloseRiskAndOpportunityDto>>({
      method: 'GET',
      url: '/api/app/risk-and-opportunity/treatment-risks-and-opportunities',
      params: { search: input.search, type: input.type, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateRiskAndOpportunityDto) =>
    this.restService.request<any, RiskAndOpportunityDto>({
      method: 'PUT',
      url: `/api/app/risk-and-opportunity/${id}`,
      body: input,
    },
    { apiName: this.apiName });

    getMatrixType = (matrix:matrixModel) =>
    this.restService.request<any, getMatrix>({
      method: 'GET',
      url: '/api/app/risk-and-opportunity/get-matrix',
      params: {matrix:matrix.NumberMatrix},
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
      params: { search: input.search,workFlowStages: input.workFlowStages,riskOpportunityId: input.riskOpportunityId,sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
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
