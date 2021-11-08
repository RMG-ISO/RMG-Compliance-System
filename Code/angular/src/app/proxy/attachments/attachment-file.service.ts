import type { AttachmentFileDto, CreateUpdateAttachmentFileDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AttachmentFileService {
  apiName = 'Default';

  create = (input: CreateUpdateAttachmentFileDto) =>
    this.restService.request<any, AttachmentFileDto>({
      method: 'POST',
      url: '/api/app/attachment-file',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/attachment-file/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, AttachmentFileDto>({
      method: 'GET',
      url: `/api/app/attachment-file/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<AttachmentFileDto>>({
      method: 'GET',
      url: '/api/app/attachment-file',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateAttachmentFileDto) =>
    this.restService.request<any, AttachmentFileDto>({
      method: 'PUT',
      url: `/api/app/attachment-file/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
