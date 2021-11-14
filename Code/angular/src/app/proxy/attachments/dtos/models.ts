import { IdentityUserDto } from '@abp/ng.account';
import type { FullAuditedEntityWithUserDto } from '@abp/ng.core';
import type { IRemoteStreamContent } from '../../volo/abp/content/models';

export interface AttachmentDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  isMultiple: boolean;
  maxFileSize: number;
  fileExtentions?: string;
  attachmentFiles: AttachmentFileDto[];
}

export interface AttachmentFileDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  name?: string;
  size: number;
  displayName?: string;
  extention?: string;
  attachmentId?: string;
  attachment: AttachmentDto;
}

export interface UploadFilesDto {
  attachmentId?: string;
  isMultiple?: boolean;
  maxFileSize?: number;
  fileExtentions?: string;
  files: IRemoteStreamContent[];
}
