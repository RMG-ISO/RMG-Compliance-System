import type { SharedStatus } from '../../shared/shared-status.enum';
import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.account';
import type { DomainDto } from '../../domains/dtos/models';
import type { ControlDto } from '../../controls/dtos/models';
import type { AssessmentDto } from '../../assessments/dtos/models';


export interface CreateUpdateFrameworkDto {
  nameAr?: string;
  nameEn?: string;
  shortcutAr?: string;
  shortcutEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  status: SharedStatus;
}


export interface FrameworkDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  nameAr?: string;
  nameEn?: string;
  shortcutAr?: string;
  shortcutEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  status: SharedStatus;
}

export interface FrameworkPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
  status?: SharedStatus;
}


export interface ComplainceDto{
  totalApplicable?:number;
  totalNotApplicable?:number;
  FrameworkData?:FrameworkData[];
}
export interface FrameworkData{
  levelOne?: number;
       levelTwo?: number;
       levelThree ?: number;
       levelfour ?: number;
       levelFive ?: number;
  FrameworkDto?:FrameworkDto;
  DomainsDta?:DomainsDta[];
}
export interface DomainsDta{
  subdomain?:DomainDto;
  ChildrenControls?:ControlsDto[];
}
export interface ControlsDto{
  subControl?:ControlDto;
  AssessmentDto?:AssessmentDto;

}
