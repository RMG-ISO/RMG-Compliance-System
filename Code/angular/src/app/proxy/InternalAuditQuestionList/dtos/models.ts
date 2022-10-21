import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { InternalAuditQuestionDto } from '@proxy/InternalAuditQuestions/dtos/models';

import { IdentityUserDto } from '@abp/ng.account';

export interface CreateUpdateInternalAuditMenuQuestionDto {
  FrameworkId?: string;
  MenuTextEn?: string;
  MenuTextAr?: string;
  IsEditable?:boolean;
  QuestionsIds?:[];
}


export interface InternalAuditMenuQuestionDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  FrameworkId?: string;
  MenuTextEn?: string;
  MenuTextAr?: string;
  IsEditable?:boolean;
  InternalAuditQuestionDto?:InternalAuditQuestionDto[];
}


export interface InternalAuditQuestionListPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  Search?: string;
 InternalAuditMenuQuestionId?: string;
 InternalAuditQuestionId ?: string;
}
export interface InternalAuditMenuQuestionPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  Search?: string;
  FrameworkId?: string;
}

