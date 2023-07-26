import type { AssessmentDto, CreateUpdateAssessmentDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  apiName = 'Default';
  

  create = (input: CreateUpdateAssessmentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AssessmentDto>({
      method: 'POST',
      url: '/api/app/assessment',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getByControlId = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AssessmentDto>({
      method: 'GET',
      url: `/api/app/assessment/${id}/by-control-id`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateAssessmentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AssessmentDto>({
      method: 'PUT',
      url: `/api/app/assessment/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
