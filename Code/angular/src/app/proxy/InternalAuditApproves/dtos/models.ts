import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { InternalAuditQuestionDto } from '@proxy/InternalAuditQuestions/dtos/models';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

export interface CreateUpdateInternalAuditApproveDto {
  IsApprove  ?:boolean;
  approveDate ?:Date;
 ApproveBy ?:string;
 CausesRefuse?:string;
}



export interface InternalAuditApproveDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
 IsApprove  ?:boolean;
  approveDate ?:Date;
 ApproveBy ?:string;
 CausesRefuse?:string;
}
export interface InternalAuditApprovePagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  IsApprove  ?:boolean;
  approveDate ?:Date;
 ApproveBy ?:string;
}
