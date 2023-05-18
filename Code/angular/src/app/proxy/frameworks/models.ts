import type { CreationAuditedEntityDto } from '@abp/ng.core';
import type { SharedFrameworkStatus } from '../shared/shared-status.enum';

export interface FrameworkChangeStatusLogDto extends CreationAuditedEntityDto<string> {
  creatorName?: string;
  status: SharedFrameworkStatus;
  comment?: string;
  frameworkId?: string;
}
