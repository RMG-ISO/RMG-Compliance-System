import type { ControlDto, ControlPagedAndSortedResultRequestDto, CreateUpdateControlDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  apiName = 'Default';

  create = (input: CreateUpdateControlDto) =>
    this.restService.request<any, ControlDto>({
      method: 'POST',
      url: '/api/app/control',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/control/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, ControlDto>({
      method: 'GET',
      url: `/api/app/control/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: ControlPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<ControlDto>>({
      method: 'GET',
      url: '/api/app/control',
      params: { mainControlId: input.mainControlId, isMainControl: input.isMainControl, search: input.search, status: input.status, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateControlDto) =>
    this.restService.request<any, ControlDto>({
      method: 'PUT',
      url: `/api/app/control/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
