import type { BreadCrumbSettingsDto, GetBreadCrumbSettingsDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreadCrumbService {
  apiName = 'Default';

  getBreadCrumbSettingsByInput = (input: GetBreadCrumbSettingsDto) =>
    this.restService.request<any, BreadCrumbSettingsDto>({
      method: 'GET',
      url: '/api/app/bread-crumb/bread-crumb-settings',
      params: { type: input.type, id: input.id },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
