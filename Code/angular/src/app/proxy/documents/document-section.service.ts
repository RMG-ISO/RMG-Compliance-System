import type { CreateUpdateDocumentSectionDto, DocumentSectionDto, DocumentSectionGetListInputDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DocumentSectionService {
  apiName = 'Default';
  

  changeOrdersByIdAndSections = (id: string, sections: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/document-section/${id}/change-orders`,
      body: sections,
    },
    { apiName: this.apiName,...config });
  

  create = (input: CreateUpdateDocumentSectionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DocumentSectionDto>({
      method: 'POST',
      url: '/api/app/document-section',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/document-section/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DocumentSectionDto>({
      method: 'GET',
      url: `/api/app/document-section/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: DocumentSectionGetListInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<DocumentSectionDto>>({
      method: 'GET',
      url: '/api/app/document-section',
      params: { documentId: input.documentId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateDocumentSectionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DocumentSectionDto>({
      method: 'PUT',
      url: `/api/app/document-section/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
