import type { CreateUpdateDomainDto, DomainDto, DomainPagedAndSortedResultRequestDto, DomainWithoutPagingDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  apiName = 'Default';

  approveComplianceById = (id: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/domain/${id}/approve-compliance`,
    },
    { apiName: this.apiName });

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

  deleteManyByIds = (ids: string[]) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/domain/many',
      params: { ids },
    },
    { apiName: this.apiName });

  endInternalAssessmentById = (id: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/domain/${id}/end-internal-assessment`,
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
      params: { frameworkId: input.frameworkId, mainDomainId: input.mainDomainId, isMainDomain: input.isMainDomain, search: input.search, status: input.status, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getListWithoutPaging = (input: DomainPagedAndSortedResultRequestDto) =>
    this.restService.request<any, ListResultDto<DomainWithoutPagingDto>>({
      method: 'GET',
      url: '/api/app/domain/without-paging',
      params: { frameworkId: input.frameworkId, mainDomainId: input.mainDomainId, isMainDomain: input.isMainDomain, search: input.search, status: input.status, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  returnToResponsibleById = (id: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/domain/${id}/return-to-responsible`,
    },
    { apiName: this.apiName });

  sendToOwnerById = (id: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/domain/${id}/send-to-owner`,
    },
    { apiName: this.apiName });

  startInternalAssessmentById = (id: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/domain/${id}/start-internal-assessment`,
    },
    { apiName: this.apiName });

  startReviewById = (id: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/domain/${id}/start-review`,
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
