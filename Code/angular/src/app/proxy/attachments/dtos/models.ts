import type { FullAuditedEntityWithUserDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

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
}
