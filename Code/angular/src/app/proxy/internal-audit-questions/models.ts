import type { FullAuditedEntityWithUserDto } from '@abp/ng.core';
import type { IdentityUserDto } from '../volo/abp/identity/models';
import type { FrameworkDto } from '../frameworks/dtos/models';

export interface CreateUpdateInternalAuditQuestionDto {
  questionTextEn?: string;
  questionTextAr?: string;
  questionExplainEn?: string;
  questionExplainAr?: string;
  frameworkId?: string;
}

export interface InternalAuditQuestionDto extends FullAuditedEntityWithUserDto<string, IdentityUserDto> {
  questionTextEn?: string;
  questionTextAr?: string;
  questionExplainEn?: string;
  questionExplainAr?: string;
  selected: boolean;
  frameworkId?: string;
  canDelete: boolean;
  framework: FrameworkDto;
}
