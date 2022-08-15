import type { CreateUpdateStaticDataDto, StaticDataDto, StaticDataPagedAndSortedResultRequestDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type {PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StaticDataService {
  apiName = 'Default';

  create = (input: CreateUpdateStaticDataDto) =>
    this.restService.request<any, StaticDataDto>({
      method: 'POST',
      url: '/api/app/static-data',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/static-data/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, StaticDataDto>({
      method: 'GET',
      url: `/api/app/static-data/${id}`,
    },
    { apiName: this.apiName });



  update = (id: string, input: CreateUpdateStaticDataDto) =>
    this.restService.request<any, StaticDataDto>({
      method: 'PUT',
      url: `/api/app/static-data/${id}`,
      body: input,
    },
    { apiName: this.apiName });


    getList = (input: StaticDataPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<StaticDataDto>>({
      method: 'GET',
      url: '/api/app/static-data/by-filter',
      params: { search: input.search, type: input.Type, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });






  constructor(private restService: RestService) {}
}
