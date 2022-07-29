import { PagedAndSortedResultRequestDto, PagedResultDto, RestService } from "@abp/ng.core";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class DocumentService {
    apiName
    constructor(private restService: RestService) {}
   
    
    getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<any>>({
      method: 'GET',
      url: '/api/app/document',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });
    

}