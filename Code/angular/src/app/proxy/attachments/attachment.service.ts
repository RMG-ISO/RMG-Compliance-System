import type { AttachmentDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { IFormFile } from '../microsoft/asp-net-core/http/models';
import type { IRemoteStreamContent } from '../volo/abp/content/models';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  apiName = 'Default';

  deleteFileByAttachmentIdAndFileId = (attachmentId: string, fileId: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/attachment/file',
      params: { attachmentId, fileId },
    },
    { apiName: this.apiName });

  getAttachmentWithFileByAttachmentId = (attachmentId: string) =>
    this.restService.request<any, AttachmentDto>({
      method: 'GET',
      url: `/api/app/attachment/attachment-with-file/${attachmentId}`,
    },
    { apiName: this.apiName });

  getDownloadAttachmentFilesByAttachmentId = (attachmentId: string) =>
    this.restService.request<any, IRemoteStreamContent>({
      method: 'GET',
      url: `/api/app/attachment/download-attachment-files/${attachmentId}`,
    },
    { apiName: this.apiName });

  getDownloadFileByFileId = (fileId: string) =>
    this.restService.request<any, IRemoteStreamContent>({
      method: 'GET',
      url: `/api/app/attachment/download-file/${fileId}`,
      responseType: 'blob',
    },
    { apiName: this.apiName });

  uploadFilesByAttachmentIdAndIsMultipleAndMaxFileSizeAndFileExtentionsAndFiles = (attachmentId: string, isMultiple: boolean, maxFileSize: number, fileExtentions: string, files: IFormFile[]) =>
    this.restService.request<any, string>({
      method: 'POST',
      responseType: 'text',
      url: '/api/app/attachment/upload-files',
      params: { attachmentId, isMultiple, maxFileSize, fileExtentions },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
