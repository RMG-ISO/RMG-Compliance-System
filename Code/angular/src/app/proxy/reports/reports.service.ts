import type { ComplianceLevelTableDto, CompliancePhaseTableDto, CompliancePriorityTableDto, ControlsCountByPriorityTableDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  apiName = 'Default';
  

  getControllerByPriorityLevelByFrameworkId = (frameworkId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompliancePriorityTableDto[]>({
      method: 'GET',
      url: `/api/app/reports/controller-by-priority-level/${frameworkId}`,
    },
    { apiName: this.apiName,...config });
  

  getControllersByComplianceLevelByFrameworkId = (frameworkId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ComplianceLevelTableDto[]>({
      method: 'GET',
      url: `/api/app/reports/controllers-by-compliance-level/${frameworkId}`,
    },
    { apiName: this.apiName,...config });
  

  getControllersByPhaseByFrameworkId = (frameworkId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompliancePhaseTableDto[]>({
      method: 'GET',
      url: `/api/app/reports/controllers-by-phase/${frameworkId}`,
    },
    { apiName: this.apiName,...config });
  

  getControlsCountByPriorityByFrameworkId = (frameworkId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ControlsCountByPriorityTableDto[]>({
      method: 'GET',
      url: `/api/app/reports/controls-count-by-priority/${frameworkId}`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
