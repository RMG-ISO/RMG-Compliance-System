import type { CreateUpdateFrameworkDto, FrameworkDto, FrameworkPagedAndSortedResultRequestDto, FrameworkData, getFrameworkDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type {RejectFrameworkDto} from './dtos'
import { IRemoteStreamContent } from '@proxy/volo/abp/content';
import { IFormFile } from '@proxy/microsoft/asp-net-core/http';
@Injectable({
  providedIn: 'root',
})
export class FrameworkService {
  apiName = 'Default';

	
  approveById = (id: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/approve`,
    },
    { apiName: this.apiName });

  
  returnToCreatorByIdAndInput = (id: string, input: RejectFrameworkDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/return-to-creator`,
      body: input,
    },
    { apiName: this.apiName });
	
	
  sendToOwnerById = (id: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/send-to-owner`,
    },
    { apiName: this.apiName });

  sendToReviewerById = (id: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/send-to-reviewer`,
    },
    { apiName: this.apiName });


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


  getListFrameWorkDashBoard = (input: getFrameworkDto) =>
    this.restService.request<any, FrameworkData>({
      method: 'GET',
      url: '/api/app/framework/frame-work-with-assesment-bYId',
      params: { FrameworkId: input.FrameworkId },
    },
      { apiName: this.apiName });

      getTempExcelFile = () =>
      this.restService.request<any, IRemoteStreamContent>({
        method: 'GET',
        url: '/api/app/framework/temp-excel-file',
      },
      { apiName: this.apiName });

      importExcelFile = (file: IRemoteStreamContent, id: string) =>
      this.restService.request<any, void>({
        method: 'POST',
        url: `/api/app/framework/${id}/import-excel-file`,
        body: file,
      },
      { apiName: this.apiName });
  constructor(private restService: RestService) { }
}
