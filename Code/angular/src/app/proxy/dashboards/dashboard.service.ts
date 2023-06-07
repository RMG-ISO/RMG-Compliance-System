import type { DashboardDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  apiName = 'Default';

  getDashboard = () =>
    this.restService.request<any, DashboardDto>({
      method: 'GET',
      url: '/api/app/dashboard/dashboard',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
