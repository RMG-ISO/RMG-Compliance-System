import type { CreateUpdateFrameworkDto, FrameworkData, FrameworkDto, FrameworkPagedAndSortedResultRequestDto, RejectFrameworkDto, TogglePriorityOutputDto, getFrameworkDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FrameworkService {
  apiName = 'Default';

  activateById = (id: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/activate`,
    },
    { apiName: this.apiName });

  approveById = (id: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/approve`,
    },
    { apiName: this.apiName });

  approveComplianceById = (id: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/approve-compliance`,
    },
    { apiName: this.apiName });

  create = (input: CreateUpdateFrameworkDto) =>
    this.restService.request<any, FrameworkDto>({
      method: 'POST',
      url: '/api/app/framework',
      body: input,
    },
    { apiName: this.apiName });

  deactivateById = (id: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/deactivate`,
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

  getFrameWorkWithAssesmentBYIdByInput = (input: getFrameworkDto) =>
    this.restService.request<any, FrameworkData>({
      method: 'GET',
      url: '/api/app/framework/frame-work-with-assesment-bYId',
      params: { frameworkId: input.frameworkId },
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
      params: { search: input.search, status: input.status, frameworkStatus: input.frameworkStatus, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  returnToCreatorByIdAndInput = (id: string, input: RejectFrameworkDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/return-to-creator`,
      body: input,
    },
    { apiName: this.apiName });

  sendForInternalAssessmentById = (id: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/send-for-internal-assessment`,
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

  startSelfAssessmentById = (id: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/framework/${id}/start-self-assessment`,
    },
    { apiName: this.apiName });

  togglePriorityById = (id: string) =>
    this.restService.request<any, TogglePriorityOutputDto>({
      method: 'PUT',
      url: `/api/app/framework/${id}/toggle-priority`,
    },
    { apiName: this.apiName });

      getTempExcelFile = () =>
      this.restService.request<any, Blob>({
        method: 'GET',
        responseType: 'blob',
        url: '/api/app/framework/temp-excel-file',
      },
      { apiName: this.apiName })
  update = (id: string, input: CreateUpdateFrameworkDto) =>
    this.restService.request<any, FrameworkDto>({
      method: 'PUT',
      url: `/api/app/framework/${id}`,
      body: input,
    },
    { apiName: this.apiName });

      importExcelFile = (file: FormData, id: string) =>
      this.restService.request<any, void>({
        method: 'POST',
        url: `/api/app/framework/${id}/import-excel-file`,
        body: file,
      },
      { apiName: this.apiName });
  constructor(private restService: RestService) { }
}
