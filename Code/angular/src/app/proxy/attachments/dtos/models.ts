import { IdentityUserDto } from '@abp/ng.account';
import type { FullAuditedEntityWithUserDto } from '@abp/ng.core';

export interface AttachmentDto extends FullAuditedEntityWithUserDto<string, IdentityUserDto> {
  isMultiple: boolean;
  maxFileSize: number;
  fileExtentions?: string;
  attachmentFiles: AttachmentFileDto[];
}

export interface AttachmentFileDto extends FullAuditedEntityWithUserDto<string, IdentityUserDto> {
  name?: string;
  size: number;
  displayName?: string;
  extention?: string;
  attachmentId?: string;
  attachment: AttachmentDto;
}

export interface CreateUpdateAttachmentDto {
  isMultiple: boolean;
  maxFileSize: number;
  fileExtentions?: string;
}

export interface CreateUpdateAttachmentFileDto {
  name?: string;
  size: number;
  displayName?: string;
  extention?: string;
  attachmentId?: string;
}
