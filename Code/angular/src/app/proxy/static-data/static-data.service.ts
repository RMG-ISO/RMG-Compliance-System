import type { CreateUpdateStaticDataDto, StaticDataDto, StaticDataPagedAndSortedResultRequestDto, getEnumTypeStaticData } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StaticDataService {
  apiName = 'Default';
  

  create = (input: CreateUpdateStaticDataDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, StaticDataDto>({
      method: 'POST',
      url: '/api/app/static-data',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/static-data/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, StaticDataDto>({
      method: 'GET',
      url: `/api/app/static-data/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: StaticDataPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<StaticDataDto>>({
      method: 'GET',
      url: '/api/app/static-data',
      params: { search: input.search, parentId: input.parentId, type: input.type, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListByFilter = (input: StaticDataPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<StaticDataDto>>({
      method: 'GET',
      url: '/api/app/static-data/by-filter',
      params: { search: input.search, parentId: input.parentId, type: input.type, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateStaticDataDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, StaticDataDto>({
      method: 'PUT',
      url: `/api/app/static-data/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getTypeStaticData = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, getEnumTypeStaticData[]>({
      method: 'GET',
      url: '/api/app/static-data/get-type-static-data',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
