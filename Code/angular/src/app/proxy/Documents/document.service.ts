import type { CreateUpdateDocumentDto, DocumentDto, DocPagedAndSortedResultRequestDto,DocumentCategoryDto,CreateUpdateDocumentCategoryDto,DocCategoryPagedAndSortedResultRequestDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type {PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  apiName = 'Default';

  create = (input: CreateUpdateDocumentDto) =>
    this.restService.request<any, DocumentDto>({
      method: 'POST',
      url: '/api/app/document',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/document/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, DocumentDto>({
      method: 'GET',
      url: `/api/app/document/${id}`,
    },
    { apiName: this.apiName });


  getList = (input: DocPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<DocumentDto>>({
      method: 'GET',
      url: '/api/app/document/document-by-category',
      params: { search: input.search, categoryId: input.CategoryId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateDocumentCategoryDto) =>
    this.restService.request<any, DocumentDto>({
      method: 'PUT',
      url: `/api/app/document/${id}`,
      body: input,
    },
    { apiName: this.apiName });
   //////Document Category //////////////////
    createCategory = (input: CreateUpdateDocumentCategoryDto) =>
    this.restService.request<any, DocumentCategoryDto>({
      method: 'POST',
      url: '/api/app/document-category',
      body: input,
    },
    { apiName: this.apiName });

  deleteCategory = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/document-category/${id}`,
    },
    { apiName: this.apiName });

  getCategory = (id: string) =>
    this.restService.request<any, DocumentCategoryDto>({
      method: 'GET',
      url: `/api/app/document-category/${id}`,
    },
    { apiName: this.apiName });


  getListCategory = (input: DocCategoryPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<DocumentCategoryDto>>({
      method: 'GET',
      url: '/api/app/document-category/get-document-categories',
      params: { search: input.search,sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  updateCategory = (id: string, input: CreateUpdateDocumentDto) =>
    this.restService.request<any, DocumentCategoryDto>({
      method: 'PUT',
      url: `/api/app/document-category/${id}`,
      body: input,
    },
    { apiName: this.apiName });






  constructor(private restService: RestService) {}
}
