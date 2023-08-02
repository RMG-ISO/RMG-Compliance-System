import type { AttachmentDto } from '../attachments/dtos/models';
import type { RiskAndOpportunityDto } from '../risks/dtos/models';
import type { FullAuditedEntityWithUserDto } from '@abp/ng.core';
import type { IdentityUserDto } from '../volo/abp/identity/models';

export interface CreateUpdateRiskTreatmentDto {
  riskOpportunityId?: string;
  mitigateActionPlanEn?: string;
  mitigateActionPlanAr?: string;
  actionDetailsEn?: string;
  actionDetailsAr?: string;
  responsibility?: string;
  status?: number;
  dueDate?: string;
  startDate?: string;
  completionDate?: string;
  achievementPercentage?: number;
  attachmentId?: string;
  attachment: AttachmentDto;
  riskAndOpportunity: RiskAndOpportunityDto;
}

export interface RiskTreatmentDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  riskOpportunityId?: string;
  mitigateActionPlanEn?: string;
  mitigateActionPlanAr?: string;
  actionDetailsEn?: string;
  actionDetailsAr?: string;
  responsibility?: string;
  responsibilityName?: string;
  status?: number;
  completionDate?: string;
  statusNameEn?: string;
  statusNameAr?: string;
  dueDate?: string;
  startDate?: string;
  achievementPercentage?: number;
  attachmentId?: string;
  attachment: AttachmentDto;
  riskAndOpportunity: RiskAndOpportunityDto;
}
