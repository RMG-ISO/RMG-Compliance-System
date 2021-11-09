import type { CreateUpdateEmployeeDto, EmployeeDto, EmployeePagedAndSortedResultRequestDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiName = 'Default';

  create = (input: CreateUpdateEmployeeDto) =>
    this.restService.request<any, EmployeeDto>({
      method: 'POST',
      url: '/api/app/employee',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/employee/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, EmployeeDto>({
      method: 'GET',
      url: `/api/app/employee/${id}`,
    },
    { apiName: this.apiName });

  getEmployeeListLookup = () =>
    this.restService.request<any, ListResultDto<EmployeeDto>>({
      method: 'GET',
      url: '/api/app/employee/employee-list-lookup',
    },
    { apiName: this.apiName });

  getList = (input: EmployeePagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<EmployeeDto>>({
      method: 'GET',
      url: '/api/app/employee',
      params: { search: input.search, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateEmployeeDto) =>
    this.restService.request<any, EmployeeDto>({
      method: 'PUT',
      url: `/api/app/employee/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
