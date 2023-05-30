import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface InternalAuditQuestionPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
}
