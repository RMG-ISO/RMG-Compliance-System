import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { EmployeeDto } from '../employees/dtos/models';
import type { CreateUpdateInternalAuditPreparationDto, InternalAuditPreparationDto, InternalAuditPreparationPagedAndSortedResultRequestDto } from '../internal-audit-preparation/dto/models';
import type { RiskAndOpportunityDto } from '../risks/dtos/models';

@Injectable({
  providedIn: 'root',
})
export class InternalAuditPreparationService {
  apiName = 'Default';
  

  create = (input: CreateUpdateInternalAuditPreparationDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InternalAuditPreparationDto>({
      method: 'POST',
      url: '/api/app/internal-audit-preparation',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/internal-audit-preparation/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InternalAuditPreparationDto>({
      method: 'GET',
      url: `/api/app/internal-audit-preparation/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getInternalAuditById = (Id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InternalAuditPreparationDto>({
      method: 'GET',
      url: `/api/app/internal-audit-preparation/internal-audit-by-id/${Id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: InternalAuditPreparationPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<InternalAuditPreparationDto>>({
      method: 'GET',
      url: '/api/app/internal-audit-preparation',
      params: { search: input.search, frameworkId: input.frameworkId, departmentId: input.departmentId, isApprove: input.isApprove, approveDate: input.approveDate, approveBy: input.approveBy, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListInternalAuditByFilter = (input: InternalAuditPreparationPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<InternalAuditPreparationDto>>({
      method: 'GET',
      url: '/api/app/internal-audit-preparation/internal-audit-by-filter',
      params: { search: input.search, frameworkId: input.frameworkId, departmentId: input.departmentId, isApprove: input.isApprove, approveDate: input.approveDate, approveBy: input.approveBy, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getRisksByFrameWorkeId = (FrmId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, RiskAndOpportunityDto[]>({
      method: 'GET',
      url: `/api/app/internal-audit-preparation/risks-by-frame-worke-id/${FrmId}`,
    },
    { apiName: this.apiName,...config });
  

  getUsersByDeptId = (DeptId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EmployeeDto[]>({
      method: 'GET',
      url: `/api/app/internal-audit-preparation/users-by-dept-id/${DeptId}`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateInternalAuditPreparationDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InternalAuditPreparationDto>({
      method: 'PUT',
      url: `/api/app/internal-audit-preparation/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
