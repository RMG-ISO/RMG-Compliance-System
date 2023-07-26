import type { CreateUpdateInternalAuditApproveDto, InternalAuditApproveDto, InternalAuditApprovePagedAndSortedResultRequestDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InternalAuditApproveService {
  apiName = 'Default';
  

  create = (input: CreateUpdateInternalAuditApproveDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InternalAuditApproveDto>({
      method: 'POST',
      url: '/api/app/internal-audit-approve',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/internal-audit-approve/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InternalAuditApproveDto>({
      method: 'GET',
      url: `/api/app/internal-audit-approve/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: InternalAuditApprovePagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<InternalAuditApproveDto>>({
      method: 'GET',
      url: '/api/app/internal-audit-approve',
      params: { isApprove: input.isApprove, approveDate: input.approveDate, approveBy: input.approveBy, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAuditAppoveByFilter = (input: InternalAuditApprovePagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<InternalAuditApproveDto>>({
      method: 'GET',
      url: '/api/app/internal-audit-approve/audit-appove-by-filter',
      params: { isApprove: input.isApprove, approveDate: input.approveDate, approveBy: input.approveBy, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateInternalAuditApproveDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InternalAuditApproveDto>({
      method: 'PUT',
      url: `/api/app/internal-audit-approve/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
