import type { CreateUpdateDomainDto, DomainDto, DomainPagedAndSortedResultRequestDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  apiName = 'Default';

  create = (input: CreateUpdateDomainDto) =>
    this.restService.request<any, DomainDto>({
      method: 'POST',
      url: '/api/app/domain',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/domain/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, DomainDto>({
      method: 'GET',
      url: `/api/app/domain/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: DomainPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<DomainDto>>({
      method: 'GET',
      url: '/api/app/domain',
      params: { mainDomainId: input.mainDomainId, isMainDomain: input.isMainDomain, search: input.search, status: input.status, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateDomainDto) =>
    this.restService.request<any, DomainDto>({
      method: 'PUT',
      url: `/api/app/domain/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
