import type { DataDecryptedReturnDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  apiName = 'Default';
  

  getDecryptedDataByValue = (value: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DataDecryptedReturnDto>({
      method: 'GET',
      url: '/api/app/helper/decrypted-data',
      params: { value },
    },
    { apiName: this.apiName,...config });
  

  getEncryptedDataByValue = (value: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DataDecryptedReturnDto>({
      method: 'GET',
      url: '/api/app/helper/encrypted-data',
      params: { value },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
