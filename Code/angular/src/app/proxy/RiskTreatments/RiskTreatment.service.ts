import type { CreateUpdateRiskTreatmentDto, RiskTreatmentDto, RiskTreatmentPagedAndSortedResultRequestDto ,StatusActionDto} from './dtos/models';
import { RestService } from '@abp/ng.core';
import type {PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RiskTreatmentService {
  apiName = 'Default';

  create = (input: CreateUpdateRiskTreatmentDto) =>
    this.restService.request<any, RiskTreatmentDto>({
      method: 'POST',
      url: '/api/app/risk-treatment',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/risk-treatment/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, RiskTreatmentDto>({
      method: 'GET',
      url: `/api/app/risk-treatment/${id}`,
    },
    { apiName: this.apiName });



  update = (id: string, input: CreateUpdateRiskTreatmentDto) =>
    this.restService.request<any, RiskTreatmentDto>({
      method: 'PUT',
      url: `/api/app/risk-treatment/${id}`,
      body: input,
    },
    { apiName: this.apiName });


    getList = (input: RiskTreatmentPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<RiskTreatmentDto>>({
      method: 'GET',
      url: '/api/app/risk-treatment/risk-by-filter',
      params: {RiskOpportunityId:input.RiskOpportunityId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

    getListStatus = () =>
    this.restService.request<any, PagedResultDto<StatusActionDto>>({
      method: 'GET',
      url: 'api/app/risk-treatment/get-status',
    },
    { apiName: this.apiName });




  constructor(private restService: RestService) {}
}
