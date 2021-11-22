import type { FullAuditedEntityWithUserDto } from '@abp/ng.core';
import type { ApplicableType } from '../applicable-type.enum';
import type { ComplianceLevelType } from '../compliance-level-type.enum';
import type { DocumentedType } from '../documented-type.enum';
import type { ImplementedType } from '../implemented-type.enum';
import type { EffectiveType } from '../effective-type.enum';
import { IdentityUserDto } from '@abp/ng.account';

export interface AssessmentDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  controlId?: string;
  applicable: ApplicableType;
  complianceLevel: ComplianceLevelType;
  complianceDate?: string;
  nextComplianceDate?: string;
  documented: DocumentedType;
  implemented: ImplementedType;
  effective: EffectiveType;
  comment?: string;
  attachmentId?: string;
}

export interface CreateUpdateAssessmentDto {
  controlId?: string;
  applicable: ApplicableType;
  complianceLevel: ComplianceLevelType;
  complianceDate?: string;
  nextComplianceDate?: string;
  documented: DocumentedType;
  implemented: ImplementedType;
  effective: EffectiveType;
  comment?: string;
  attachmentId?: string;
}
