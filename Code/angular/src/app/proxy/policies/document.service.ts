import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateDocumentDto, DocPagedAndSortedResultRequestDto, DocumentDto } from '../documents/dtos/models';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  apiName = 'Default';
  

  create = (input: CreateUpdateDocumentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DocumentDto>({
      method: 'POST',
      url: '/api/app/document',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/document/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DocumentDto>({
      method: 'GET',
      url: `/api/app/document/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getById = (Id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DocumentDto>({
      method: 'GET',
      url: `/api/app/document/by-id/${Id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: DocPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<DocumentDto>>({
      method: 'GET',
      url: '/api/app/document',
      params: { search: input.search, categoryId: input.categoryId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListDocumentByCategory = (input: DocPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<DocumentDto>>({
      method: 'GET',
      url: '/api/app/document/document-by-category',
      params: { search: input.search, categoryId: input.categoryId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateDocumentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DocumentDto>({
      method: 'PUT',
      url: `/api/app/document/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
