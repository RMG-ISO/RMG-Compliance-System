import type { SubscriptionDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  apiName = 'Default';
  

  getSubscriptionDate = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, SubscriptionDto>({
      method: 'GET',
      url: '/api/app/subscription/subscription-date',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
