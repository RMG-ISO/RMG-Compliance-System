import type { CreateUpdateInternalAuditPreparationDto, InternalAuditPreparationDto, InternalAuditPreparationPagedAndSortedResultRequestDto} from './dtos/models';
import { RestService } from '@abp/ng.core';
import type {PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

import type { EmployeeDto } from '../employees/dtos/models';

@Injectable({
  providedIn: 'root',
})
export class InternalAuditPreparationService {
  apiName = 'Default';

  create = (input: CreateUpdateInternalAuditPreparationDto) =>
    this.restService.request<any, InternalAuditPreparationDto>({
      method: 'POST',
      url: '/api/app/internal-audit-preparation',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/internal-audit-preparation/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, InternalAuditPreparationDto>({
      method: 'GET',
      url: `/api/app/internal-audit-preparation/menu-question-by-id/${id}`,
    },
    { apiName: this.apiName });



  update = (id: string, input: CreateUpdateInternalAuditPreparationDto) =>
    this.restService.request<any, InternalAuditPreparationDto>({
      method: 'PUT',
      url: `/api/app/internal-audit-preparation/${id}`,
      body: input,
    },
    { apiName: this.apiName });


    getList = (input: InternalAuditPreparationPagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<InternalAuditPreparationDto>>({
      method: 'GET',
      url: '/api/app/internal-audit-preparation/internal-audit-by-filter',
      params: { ApproveBy:input.ApproveBy,approveDate:input.approveDate,IsApprove:input.IsApprove, Search:input.Search,DepartmentId:input.DepartmentId,FrameworkId:input.FrameworkId,sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

    getByID = (id:string ) =>
    this.restService.request<any, InternalAuditPreparationDto>({
      method: 'GET',
      url: '/api/app/internal-audit-preparation/internal-audit-by-id/' + id,
      params: { Id:id},
    },
    { apiName: this.apiName });

    getUserByDeptId = (deptId:string ) =>
    this.restService.request<any, EmployeeDto[]>({
      method: 'GET',
      url: `/api/app/internal-audit-preparation/users-by-dept-id/${deptId}`,
    },
    { apiName: this.apiName });




  constructor(private restService: RestService) {}
}
