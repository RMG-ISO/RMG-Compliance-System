import type { CreateDocumentDto, DocumentDto, DocumentGetListInputDto, SendPrinciplesForComplianceDto, TakeActionWithNotes, TakeActionWithRequiredNotes } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { NameId } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  apiName = 'Default';
  

  approveByIdAndInput = (id: string, input: TakeActionWithNotes, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/document/${id}/approve`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  create = (input: CreateDocumentDto, config?: Partial<Rest.Config>) =>
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
  

  endPrinciplesComplianceById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/document/${id}/end-principles-compliance`,
    },
    { apiName: this.apiName,...config });
  

  finishUserApprovalByIdAndInput = (id: string, input: TakeActionWithNotes, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/document/${id}/finish-user-approval`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  finishUserRevisionByIdAndInput = (id: string, input: TakeActionWithNotes, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/document/${id}/finish-user-revision`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DocumentDto>({
      method: 'GET',
      url: `/api/app/document/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllCategories = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ListResultDto<NameId<string>>>({
      method: 'GET',
      url: '/api/app/document/categories',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: DocumentGetListInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<DocumentDto>>({
      method: 'GET',
      url: '/api/app/document',
      params: { code: input.code, name: input.name, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  returnToCreatorByIdAndInput = (id: string, input: TakeActionWithRequiredNotes, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/document/${id}/return-to-creator`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  sendForApprovalByIdAndInput = (id: string, input: TakeActionWithNotes, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/document/${id}/send-for-approval`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  sendForRevisionByIdAndInput = (id: string, input: TakeActionWithNotes, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/document/${id}/send-for-revision`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  sendPrinciplesForComplianceByInput = (input: SendPrinciplesForComplianceDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/app/document/send-principles-for-compliance',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  startPrinciplesComplianceById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/document/${id}/start-principles-compliance`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateDocumentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DocumentDto>({
      method: 'PUT',
      url: `/api/app/document/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
