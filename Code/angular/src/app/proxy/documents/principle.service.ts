import type { CreateUpdatePrincipleDto, PrincipleDto, PrincipleGetListInputDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrincipleService {
  apiName = 'Default';
  

  create = (input: CreateUpdatePrincipleDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PrincipleDto>({
      method: 'POST',
      url: '/api/app/principle',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/principle/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PrincipleDto>({
      method: 'GET',
      url: `/api/app/principle/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PrincipleGetListInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<PrincipleDto>>({
      method: 'GET',
      url: '/api/app/principle',
      params: { documentId: input.documentId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdatePrincipleDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PrincipleDto>({
      method: 'PUT',
      url: `/api/app/principle/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
