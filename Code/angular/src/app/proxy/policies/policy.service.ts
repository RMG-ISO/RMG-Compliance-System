import type { CreatePolicyDto, GetListPoliciesDto, PolicyDto, UpdatePolicyDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  apiName = 'Default';
  

  create = (input: CreatePolicyDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PolicyDto>({
      method: 'POST',
      url: '/api/app/policy',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/policy/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PolicyDto>({
      method: 'GET',
      url: `/api/app/policy/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetListPoliciesDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<PolicyDto>>({
      method: 'GET',
      url: '/api/app/policy',
      params: { status: input.status, type: input.type, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: UpdatePolicyDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PolicyDto>({
      method: 'PUT',
      url: `/api/app/policy/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
