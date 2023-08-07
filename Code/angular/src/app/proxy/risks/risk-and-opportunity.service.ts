import type { CreateUpdateRiskAndOpportunityDto, RiskAndOpportunityDto, RiskOpportunityPagedAndSortedResultRequestDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { getEnumTypeStaticData, getMatrix } from '../static-data/models';

@Injectable({
  providedIn: 'root',
})
export class RiskAndOpportunityService {
  apiName = 'Default';
  

  allRisksAndOpportunitiesByInput = (input: RiskOpportunityPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<RiskAndOpportunityDto>>({
      method: 'GET',
      url: '/api/app/risk-and-opportunity/all-risks-and-opportunities',
      params: { search: input.search, type: input.type, potential: input.potential, reEvaluation: input.reEvaluation, potentialValue: input.potentialValue, ownerId: input.ownerId, status: input.status, userId: input.userId, departmentId: input.departmentId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  create = (input: CreateUpdateRiskAndOpportunityDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, RiskAndOpportunityDto>({
      method: 'POST',
      url: '/api/app/risk-and-opportunity',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/risk-and-opportunity/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, RiskAndOpportunityDto>({
      method: 'GET',
      url: `/api/app/risk-and-opportunity/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: RiskOpportunityPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<RiskAndOpportunityDto>>({
      method: 'GET',
      url: '/api/app/risk-and-opportunity',
      params: { search: input.search, type: input.type, potential: input.potential, reEvaluation: input.reEvaluation, potentialValue: input.potentialValue, ownerId: input.ownerId, status: input.status, userId: input.userId, departmentId: input.departmentId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListRiskByFilter = (input: RiskOpportunityPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<RiskAndOpportunityDto>>({
      method: 'GET',
      url: '/api/app/risk-and-opportunity/risk-by-filter',
      params: { search: input.search, type: input.type, potential: input.potential, reEvaluation: input.reEvaluation, potentialValue: input.potentialValue, ownerId: input.ownerId, status: input.status, userId: input.userId, departmentId: input.departmentId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListRiskByOwnerId = (input: RiskOpportunityPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<RiskAndOpportunityDto>>({
      method: 'GET',
      url: '/api/app/risk-and-opportunity/risk-by-owner-id',
      params: { search: input.search, type: input.type, potential: input.potential, reEvaluation: input.reEvaluation, potentialValue: input.potentialValue, ownerId: input.ownerId, status: input.status, userId: input.userId, departmentId: input.departmentId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getMitigationRisksAndOpportunitiesByInput = (input: RiskOpportunityPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Record<string, number>>({
      method: 'GET',
      url: '/api/app/risk-and-opportunity/mitigation-risks-and-opportunities',
      params: { search: input.search, type: input.type, potential: input.potential, reEvaluation: input.reEvaluation, potentialValue: input.potentialValue, ownerId: input.ownerId, status: input.status, userId: input.userId, departmentId: input.departmentId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  openCloseRisksAndOpportunitiesByInput = (input: RiskOpportunityPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Record<string, number>>({
      method: 'GET',
      url: '/api/app/risk-and-opportunity/open-close-risks-and-opportunities',
      params: { search: input.search, type: input.type, potential: input.potential, reEvaluation: input.reEvaluation, potentialValue: input.potentialValue, ownerId: input.ownerId, status: input.status, userId: input.userId, departmentId: input.departmentId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  treatmentRisksAndOpportunitiesByInput = (input: RiskOpportunityPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Record<string, number>>({
      method: 'GET',
      url: '/api/app/risk-and-opportunity/treatment-risks-and-opportunities',
      params: { search: input.search, type: input.type, potential: input.potential, reEvaluation: input.reEvaluation, potentialValue: input.potentialValue, ownerId: input.ownerId, status: input.status, userId: input.userId, departmentId: input.departmentId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateRiskAndOpportunityDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, RiskAndOpportunityDto>({
      method: 'PUT',
      url: `/api/app/risk-and-opportunity/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getMatrixByMatrix = (matrix: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, getMatrix>({
      method: 'GET',
      url: '/api/app/risk-and-opportunity/get-matrix',
      params: { matrix },
    },
    { apiName: this.apiName,...config });
  

  getPotentialNameByPotential = (Potential: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, getEnumTypeStaticData>({
      method: 'GET',
      url: '/api/app/risk-and-opportunity/get-potential-name',
      params: { potential: Potential },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
