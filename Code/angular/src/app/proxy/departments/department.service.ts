import type { CreateUpdateDepartmentDto, DepartmentDto, DepartmentPagedAndSortedResultRequestDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  apiName = 'Default';

  create = (input: CreateUpdateDepartmentDto) =>
    this.restService.request<any, DepartmentDto>({
      method: 'POST',
      url: '/api/app/department',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/department/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, DepartmentDto>({
      method: 'GET',
      url: `/api/app/department/${id}`,
    },
    { apiName: this.apiName });

  getDepartmentListLookup = () =>
    this.restService.request<any, ListResultDto<DepartmentDto>>({
      method: 'GET',
      url: '/api/app/department/department-list-lookup',
    },
    { apiName: this.apiName });

  getList = (input: DepartmentPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<DepartmentDto>>({
      method: 'GET',
      url: '/api/app/department',
      params: { search: input.search, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateDepartmentDto) =>
    this.restService.request<any, DepartmentDto>({
      method: 'PUT',
      url: `/api/app/department/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
