import type { CreateUpdateInternalAuditApproveDto, InternalAuditApproveDto, InternalAuditApprovePagedAndSortedResultRequestDto} from './dtos/models';
import { RestService } from '@abp/ng.core';
import type {PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InternalAuditApproveService {
  apiName = 'Default';

  create = (input: CreateUpdateInternalAuditApproveDto) =>
    this.restService.request<any, InternalAuditApproveDto>({
      method: 'POST',
      url: '/api/app/internal-audit-approve',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/internal-audit-approve/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, InternalAuditApproveDto>({
      method: 'GET',
      url: `/api/app/internal-audit-approve/${id}`,
    },
    { apiName: this.apiName });



  update = (id: string, input: CreateUpdateInternalAuditApproveDto) =>
    this.restService.request<any, InternalAuditApproveDto>({
      method: 'PUT',
      url: `/api/app/internal-audit-approve/${id}`,
      body: input,
    },
    { apiName: this.apiName });


    getList = (input: InternalAuditApprovePagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<InternalAuditApproveDto>>({
      method: 'GET',
      url: '/api/app/internal-audit-approve/audit-appove-by-filter',
      params: {approveDate:input.approveDate,ApproveBy:input.ApproveBy,IsApprove:input.IsApprove,sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });






  constructor(private restService: RestService) {}
}
