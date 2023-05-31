import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { FrameworkDto } from '../../../frameworks/dtos/models';
import type { InternalAuditQuestionDto } from '../../../internal-audit-questions/models';

export interface CreateUpdateInternalAuditMenuQuestionDto {
  menuTextEn?: string;
  menuTextAr?: string;
  isEditable: boolean;
  frameworkId?: string;
  questionsIds: string[];
}

export interface InternalAuditMenuQuestionDto extends FullAuditedEntityWithUserDto<string, IdentityUserDto> {
  menuTextEn?: string;
  menuTextAr?: string;
  isEditable: boolean;
  frameworkId?: string;
  framework: FrameworkDto;
  internalAuditQuestions: InternalAuditQuestionDto[];
}

export interface InternalAuditMenuQuestionPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
  frameworkId?: string;
}
