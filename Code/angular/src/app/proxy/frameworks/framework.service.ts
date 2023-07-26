import type { CreateUpdateFrameworkDto, FrameworkData, FrameworkDto, FrameworkPagedAndSortedResultRequestDto, RejectFrameworkDto, TogglePriorityOutputDto, getFrameworkDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FrameworkService {
  apiName = 'Default';
  

  activateById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/activate`,
    },
    { apiName: this.apiName,...config });
  

  approveById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/approve`,
    },
    { apiName: this.apiName,...config });
  

  approveComplianceById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/approve-compliance`,
    },
    { apiName: this.apiName,...config });
  

  create = (input: CreateUpdateFrameworkDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, FrameworkDto>({
      method: 'POST',
      url: '/api/app/framework',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deactivateById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/deactivate`,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/framework/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, FrameworkDto>({
      method: 'GET',
      url: `/api/app/framework/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getFrameWorkWithAssesmentBYIdByInput = (input: getFrameworkDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, FrameworkData>({
      method: 'GET',
      url: '/api/app/framework/frame-work-with-assesment-bYId',
      params: { frameworkId: input.frameworkId },
    },
    { apiName: this.apiName,...config });
  

  getFrameworkListLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ListResultDto<FrameworkDto>>({
      method: 'GET',
      url: '/api/app/framework/framework-list-lookup',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: FrameworkPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<FrameworkDto>>({
      method: 'GET',
      url: '/api/app/framework',
      params: { search: input.search, status: input.status, frameworkStatus: input.frameworkStatus, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getTempExcelFile = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/framework/temp-excel-file',
    },
    { apiName: this.apiName,...config });
  

  importExcelFile = (file: FormData, id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/framework/${id}/import-excel-file`,
      body: file,
    },
    { apiName: this.apiName,...config });
  

  returnToCreatorByIdAndInput = (id: string, input: RejectFrameworkDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/return-to-creator`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  sendForInternalAssessmentById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/send-for-internal-assessment`,
    },
    { apiName: this.apiName,...config });
  

  sendToOwnerById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/send-to-owner`,
    },
    { apiName: this.apiName,...config });
  

  sendToReviewerById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/send-to-reviewer`,
    },
    { apiName: this.apiName,...config });
  

  startSelfAssessmentById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/start-self-assessment`,
    },
    { apiName: this.apiName,...config });
  

  togglePriorityById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TogglePriorityOutputDto>({
      method: 'PUT',
      url: `/api/app/framework/${id}/toggle-priority`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateFrameworkDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, FrameworkDto>({
      method: 'PUT',
      url: `/api/app/framework/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
