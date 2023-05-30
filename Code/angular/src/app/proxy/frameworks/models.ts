import type { CreationAuditedEntityDto } from '@abp/ng.core';
import type { FrameworkStatus } from '../shared/framework-status.enum';

export interface FrameworkChangeStatusLogDto extends CreationAuditedEntityDto<string> {
  creatorName?: string;
  status: FrameworkStatus;
  comment?: string;
  frameworkId?: string;
}
