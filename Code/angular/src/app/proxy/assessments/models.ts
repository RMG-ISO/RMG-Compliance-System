import type { CreationAuditedEntityWithUserDto } from '@abp/ng.core';
import type { ApplicableType } from './applicable-type.enum';
import type { ComplianceLevelType } from './compliance-level-type.enum';
import type { DocumentedType } from './documented-type.enum';
import type { ImplementedType } from './implemented-type.enum';
import type { PriorityType } from './priority-type.enum';
import type { EffectiveType } from './effective-type.enum';

export interface AssessmentVersionDto extends CreationAuditedEntityWithUserDto<string, IdentityUserDto> {
  assessmentId?: string;
  applicable?: ApplicableType;
  complianceLevel?: ComplianceLevelType;
  complianceDate?: string;
  nextComplianceDate?: string;
  documented?: DocumentedType;
  documentedPercentage?: number;
  implemented?: ImplementedType;
  priority?: PriorityType;
  implementedPercentage?: number;
  effective?: EffectiveType;
  effectivePercentage?: number;
  comment?: string;
  attachmentId?: string;
}
