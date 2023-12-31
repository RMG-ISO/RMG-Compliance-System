import type { ControlDto, ControlLookupPagedResultRequestDto, ControlPagedAndSortedResultRequestDto, CreateUpdateControlDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { NameId } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  apiName = 'Default';
  

  create = (input: CreateUpdateControlDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ControlDto>({
      method: 'POST',
      url: '/api/app/control',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/control/${id}`,
    },
    { apiName: this.apiName,...config });
  

  deleteManyByIds = (ids: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/control/many',
      params: { ids },
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ControlDto>({
      method: 'GET',
      url: `/api/app/control/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: ControlPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ControlDto>>({
      method: 'GET',
      url: '/api/app/control',
      params: { mainControlId: input.mainControlId, isMainControl: input.isMainControl, search: input.search, status: input.status, domainId: input.domainId, frameWorkId: input.frameWorkId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListControlsByFramwork = (input: ControlPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ListResultDto<ControlDto>>({
      method: 'GET',
      url: '/api/app/control/controls-by-framwork',
      params: { mainControlId: input.mainControlId, isMainControl: input.isMainControl, search: input.search, status: input.status, domainId: input.domainId, frameWorkId: input.frameWorkId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListLookupByInput = (input: ControlLookupPagedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<NameId<string>>>({
      method: 'GET',
      url: '/api/app/control/lookup',
      params: { maxResultCount: input.maxResultCount, skipCount: input.skipCount, search: input.search },
    },
    { apiName: this.apiName,...config });
  

  getListWithoutPaging = (input: ControlPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ListResultDto<ControlDto>>({
      method: 'GET',
      url: '/api/app/control/without-paging',
      params: { mainControlId: input.mainControlId, isMainControl: input.isMainControl, search: input.search, status: input.status, domainId: input.domainId, frameWorkId: input.frameWorkId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateControlDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ControlDto>({
      method: 'PUT',
      url: `/api/app/control/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
