import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface InternalAuditQuestionListPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
  internalAuditMenuQuestionId?: string;
  internalAuditQuestionId?: string;
}
