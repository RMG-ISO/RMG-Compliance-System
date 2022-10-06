import type { CreateUpdateFrameworkDto, FrameworkDto, FrameworkPagedAndSortedResultRequestDto,ComplainceDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
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

  getFrameworkListLookup = () =>
    this.restService.request<any, ListResultDto<FrameworkDto>>({
      method: 'GET',
      url: '/api/app/framework/framework-list-lookup',
    },
    { apiName: this.apiName });

  getList = (input: FrameworkPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<FrameworkDto>>({
      method: 'GET',
      url: '/api/app/framework',
      params: { search: input.search, status: input.status, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateFrameworkDto) =>
    this.restService.request<any, FrameworkDto>({
      method: 'PUT',
      url: `/api/app/framework/${id}`,
      body: input,
    },
    { apiName: this.apiName });


    getListFrameWorkDashBoard = () =>
    this.restService.request<any, ComplainceDto>({
      method: 'GET',
      url: '/api/app/framework/frame-work-with-assesment-data',
    },
    { apiName: this.apiName });


  constructor(private restService: RestService) {}
}
