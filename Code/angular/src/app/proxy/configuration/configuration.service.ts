import type { ConfigurationDto, UpdateLogoDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  apiName = 'Default';
  

  getAll = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ConfigurationDto[]>({
      method: 'GET',
      url: '/api/app/configuration',
    },
    { apiName: this.apiName,...config });
  

  updateLogoByDto = (dto: UpdateLogoDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/app/configuration/logo',
      body: dto,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
