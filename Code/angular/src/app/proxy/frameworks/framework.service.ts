import type { CreateUpdateFrameworkDto, FrameworkDto, FrameworkPagedAndSortedResultRequestDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FrameworkService {
  apiName = 'Default';

  create = (input: CreateUpdateFrameworkDto) =>
    this.restService.request<any, FrameworkDto>({
      method: 'POST',
      url: '/api/app/framework',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/framework/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, FrameworkDto>({
      method: 'GET',
      url: `/api/app/framework/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: FrameworkPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<FrameworkDto>>({
      method: 'GET',
      url: '/api/app/framework',
      params: { search: input.search, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateFrameworkDto) =>
    this.restService.request<any, FrameworkDto>({
      method: 'PUT',
      url: `/api/app/framework/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
