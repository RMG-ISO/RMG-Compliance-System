import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface RiskTreatmentPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  riskOpportunityId?: string;
}
