import type { AttachmentDto, CreateUpdateAttachmentDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  apiName = 'Default';

  create = (input: CreateUpdateAttachmentDto) =>
    this.restService.request<any, AttachmentDto>({
      method: 'POST',
      url: '/api/app/attachment',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/attachment/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, AttachmentDto>({
      method: 'GET',
      url: `/api/app/attachment/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<AttachmentDto>>({
      method: 'GET',
      url: '/api/app/attachment',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateAttachmentDto) =>
    this.restService.request<any, AttachmentDto>({
      method: 'PUT',
      url: `/api/app/attachment/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
