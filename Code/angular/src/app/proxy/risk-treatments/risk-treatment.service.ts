import type { RiskTreatmentPagedAndSortedResultRequestDto } from './dtos/models';
import type { CreateUpdateRiskTreatmentDto, RiskTreatmentDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { getEnumTypeStaticData } from '../static-data/models';

@Injectable({
  providedIn: 'root',
})
export class RiskTreatmentService {
  apiName = 'Default';
  

  create = (input: CreateUpdateRiskTreatmentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, RiskTreatmentDto>({
      method: 'POST',
      url: '/api/app/risk-treatment',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/risk-treatment/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, RiskTreatmentDto>({
      method: 'GET',
      url: `/api/app/risk-treatment/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: RiskTreatmentPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<RiskTreatmentDto>>({
      method: 'GET',
      url: '/api/app/risk-treatment',
      params: { riskOpportunityId: input.riskOpportunityId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListRiskByFilter = (input: RiskTreatmentPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<RiskTreatmentDto>>({
      method: 'GET',
      url: '/api/app/risk-treatment/risk-by-filter',
      params: { riskOpportunityId: input.riskOpportunityId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateRiskTreatmentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, RiskTreatmentDto>({
      method: 'PUT',
      url: `/api/app/risk-treatment/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getStatus = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, getEnumTypeStaticData[]>({
      method: 'GET',
      url: '/api/app/risk-treatment/get-status',
    },
    { apiName: this.apiName,...config });
  

  getStatusNameByStatusId = (statusId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, getEnumTypeStaticData>({
      method: 'GET',
      url: `/api/app/risk-treatment/get-status-name/${statusId}`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
