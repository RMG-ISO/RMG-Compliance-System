import type { FullAuditedEntityWithUserDto } from '@abp/ng.core';
import type { IdentityUserDto } from '../../volo/abp/identity/models';
import type { ApplicableType } from '../applicable-type.enum';
import type { ComplianceLevelType } from '../compliance-level-type.enum';
import type { DocumentedType } from '../documented-type.enum';
import type { ImplementedType } from '../implemented-type.enum';
import type { PriorityType } from '../priority-type.enum';
import type { EffectiveType } from '../effective-type.enum';
import type { NameId } from '../../shared/models';
import type { AssessmentVersionDto } from '../models';

export interface AssessmentDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  controlId?: string;
  applicable?: ApplicableType;
  complianceLevel?: ComplianceLevelType;
  complianceDate?: string;
  nextComplianceDate?: string;
  documented?: DocumentedType;
  implemented?: ImplementedType;
  priority?: PriorityType;
  effective?: EffectiveType;
  documentedPercentage?: number;
  implementedPercentage?: number;
  effectivePercentage?: number;
  comment?: string;
  attachmentId?: string;
  compliancePercentage: number;
  employees: NameId<string>[];
  versions: AssessmentVersionDto[];
}

export interface CreateUpdateAssessmentDto {
  controlId?: string;
  applicable?: ApplicableType;
  complianceLevel?: ComplianceLevelType;
  complianceDate?: string;
  nextComplianceDate?: string;
  documented?: DocumentedType;
  implemented?: ImplementedType;
  priority?: PriorityType;
  effective?: EffectiveType;
  documentedPercentage?: number;
  implementedPercentage?: number;
  effectivePercentage?: number;
  comment?: string;
  attachmentId?: string;
  employeeIds: string[];
}
