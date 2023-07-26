import type { BreadCrumbSettingsDto, GetBreadCrumbSettingsDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreadCrumbService {
  apiName = 'Default';
  

  getBreadCrumbSettingsByInput = (input: GetBreadCrumbSettingsDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BreadCrumbSettingsDto>({
      method: 'GET',
      url: '/api/app/bread-crumb/bread-crumb-settings',
      params: { type: input.type, id: input.id },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
