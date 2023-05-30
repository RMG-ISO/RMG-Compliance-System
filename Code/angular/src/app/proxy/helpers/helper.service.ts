import type { DataDecryptedReturnDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  apiName = 'Default';

  getDecryptedDataByValue = (value: string) =>
    this.restService.request<any, DataDecryptedReturnDto>({
      method: 'GET',
      url: '/api/app/helper/decrypted-data',
      params: { value },
    },
    { apiName: this.apiName });

  getEncryptedDataByValue = (value: string) =>
    this.restService.request<any, DataDecryptedReturnDto>({
      method: 'GET',
      url: '/api/app/helper/encrypted-data',
      params: { value },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
