import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateUpdateEmailTemplateDto {
  key?: string;
  subject?: string;
  body?: string;
  notificationBody?: string;
}

export interface EmailTemplateDto extends FullAuditedEntityDto<string> {
  key?: string;
  subject?: string;
  body?: string;
  notificationBody?: string;
}

export interface EmailTemplatePagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  key?: string;
  subject?: string;
  search?: string;
}
