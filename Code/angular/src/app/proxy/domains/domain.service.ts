import type { CreateUpdateDomainDto, DomainDto, DomainPagedAndSortedResultRequestDto, DomainWithoutPagingDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  apiName = 'Default';
  

  approveComplianceById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/domain/${id}/approve-compliance`,
    },
    { apiName: this.apiName,...config });
  

  create = (input: CreateUpdateDomainDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DomainDto>({
      method: 'POST',
      url: '/api/app/domain',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/domain/${id}`,
    },
    { apiName: this.apiName,...config });
  

  deleteManyByIds = (ids: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/domain/many',
      params: { ids },
    },
    { apiName: this.apiName,...config });
  

  endInternalAssessmentById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/domain/${id}/end-internal-assessment`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DomainDto>({
      method: 'GET',
      url: `/api/app/domain/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: DomainPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<DomainDto>>({
      method: 'GET',
      url: '/api/app/domain',
      params: { frameworkId: input.frameworkId, mainDomainId: input.mainDomainId, isMainDomain: input.isMainDomain, search: input.search, status: input.status, hasPriority: input.hasPriority, isDocumented: input.isDocumented, isEffective: input.isEffective, isImplemented: input.isImplemented, level: input.level, departmentId: input.departmentId, ownerId: input.ownerId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListWithoutPaging = (input: DomainPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ListResultDto<DomainWithoutPagingDto>>({
      method: 'GET',
      url: '/api/app/domain/without-paging',
      params: { frameworkId: input.frameworkId, mainDomainId: input.mainDomainId, isMainDomain: input.isMainDomain, search: input.search, status: input.status, hasPriority: input.hasPriority, isDocumented: input.isDocumented, isEffective: input.isEffective, isImplemented: input.isImplemented, level: input.level, departmentId: input.departmentId, ownerId: input.ownerId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  returnToResponsibleById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/domain/${id}/return-to-responsible`,
    },
    { apiName: this.apiName,...config });
  

  sendToOwnerById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/domain/${id}/send-to-owner`,
    },
    { apiName: this.apiName,...config });
  

  startInternalAssessmentById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/domain/${id}/start-internal-assessment`,
    },
    { apiName: this.apiName,...config });
  

  startReviewById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/domain/${id}/start-review`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateDomainDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DomainDto>({
      method: 'PUT',
      url: `/api/app/domain/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
