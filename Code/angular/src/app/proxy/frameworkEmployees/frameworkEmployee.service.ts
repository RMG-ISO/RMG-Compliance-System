import type { CreateUpdateFrameworkEmployeeDto, FrameworkEmployeeDto, FrameworkEmployeePagedAndSortedResultRequestDto, getFrameworkEmployeeDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { FrameworkDto } from '@proxy/frameworks/dtos';

@Injectable({
  providedIn: 'root',
})
export class FrameworkEmployeeService {
  apiName = 'Default';

  create = (input: CreateUpdateFrameworkEmployeeDto) =>
    this.restService.request<any, FrameworkEmployeeDto>({
      method: 'POST',
      url: '/api/app/FrameworkEmployee',
      body: input,
    },
      { apiName: this.apiName });
      FrameworkEmployeeEmployees
  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/FrameworkEmployee/${id}`,
    },
      { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, FrameworkEmployeeDto>({
      method: 'GET',
      url: `/api/app/FrameworkEmployee/${id}`,
    },
      { apiName: this.apiName });

  getFrameworkEmployeeListLookup = () =>
    this.restService.request<any, ListResultDto<FrameworkEmployeeDto>>({
      method: 'GET',
      url: '/api/app/FrameworkEmployee/FrameworkEmployee-list-lookup',
    },
      { apiName: this.apiName });

  getList = (input: FrameworkEmployeePagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<FrameworkEmployeeDto>>({
      method: 'GET',
      url: '/api/app/FrameworkEmployee',
      params: {  FrameworkEmployeeId: input.FrameworkEmployeeId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
      { apiName: this.apiName });

  update = (id: string, input: CreateUpdateFrameworkEmployeeDto) =>
    this.restService.request<any, FrameworkEmployeeDto>({
      method: 'PUT',
      url: `/api/app/FrameworkEmployee/${id}`,
      body: input,
    },
      { apiName: this.apiName });


  getListFrameworkEmployeeDashBoard = (input: getFrameworkEmployeeDto) =>
    this.restService.request<any, ListResultDto<FrameworkEmployeeDto>>({
      method: 'GET',
      url: '/api/app/FrameworkEmployee/frame-work-with-assesment-bYId',
      params: { FrameworkEmployeeId: input.FrameworkEmployeeId },
    },
      { apiName: this.apiName });


  constructor(private restService: RestService) { }
}
