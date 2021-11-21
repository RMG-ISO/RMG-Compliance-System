import type { AssessmentDto, CreateUpdateAssessmentDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  apiName = 'Default';

  create = (input: CreateUpdateAssessmentDto) =>
    this.restService.request<any, AssessmentDto>({
      method: 'POST',
      url: '/api/app/assessment',
      body: input,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, AssessmentDto>({
      method: 'GET',
      url: `/api/app/assessment/${id}`,
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateAssessmentDto) =>
    this.restService.request<any, AssessmentDto>({
      method: 'PUT',
      url: `/api/app/assessment/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
