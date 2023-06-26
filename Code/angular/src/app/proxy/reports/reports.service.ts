import type { ComplianceLevelTableDto, CompliancePhaseTableDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  apiName = 'Default';

  getControllersByComplianceLevelByFrameworkId = (frameworkId: string) =>
    this.restService.request<any, ComplianceLevelTableDto[]>({
      method: 'GET',
      url: `/api/app/reports/controllers-by-compliance-level/${frameworkId}`,
    },
    { apiName: this.apiName });

  getControllersByPhaseByFrameworkId = (frameworkId: string) =>
    this.restService.request<any, CompliancePhaseTableDto[]>({
      method: 'GET',
      url: `/api/app/reports/controllers-by-phase/${frameworkId}`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
