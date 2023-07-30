import type { EntityDto } from '@abp/ng.core';

export interface SubscriptionDto extends EntityDto {
  startDate?: string;
  endDate?: string;
}
