import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { IdentityUserDto } from '../volo/abp/identity/models';
import type { InternalAuditPreparationDto } from '../internal-audit-preparation/dto/models';

export interface CreateUpdateInternalAuditApproveDto {
  isApprove: boolean;
  approveDate?: string;
  approveBy?: string;
  causesRefuse?: string;
}

export interface InternalAuditApproveDto extends FullAuditedEntityWithUserDto<string, IdentityUserDto> {
  internalAuditId?: string;
  isApprove: boolean;
  approveDate?: string;
  approveBy?: string;
  causesRefuse?: string;
  userApproveBy: IdentityUserDto;
  internalAuditPreparationDto: InternalAuditPreparationDto;
}

export interface InternalAuditApprovePagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  isApprove?: boolean;
  approveDate?: string;
  approveBy?: string;
}
