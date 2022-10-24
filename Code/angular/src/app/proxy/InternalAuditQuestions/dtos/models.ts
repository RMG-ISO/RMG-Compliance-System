import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.account';

export interface CreateUpdateInternalAuditQuestionDto {
  FrameworkId?: string;
  QuestionTextEn?: string;
  QuestionTextAr?: string;
  QuestionExplainEn?:string;
  QuestionExplainAr?:string;
}


export interface InternalAuditQuestionDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  FrameworkId?: string;
  QuestionTextEn?: string;
  QuestionTextAr?: string;
  QuestionExplainEn?:string;
  QuestionExplainAr?:string;
  CanDelete?:boolean;
}

export interface InternalAuditQuestionPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  Search?: string;
}
