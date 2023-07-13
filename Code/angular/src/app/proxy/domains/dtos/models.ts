import type { SharedStatus } from '../../shared/shared-status.enum';
import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { ComplianceStatus } from '../../shared/compliance-status.enum';
import type { NameId } from '../../shared/models';
import type { ControlDto } from '../../controls/dtos/models';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

export interface CreateUpdateDomainDto {
  nameAr?: string;
  nameEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  reference?: string;
  status: SharedStatus;
  parentId?: string;
  frameworkId?: string;
  responsibleId?: string;
  departmentIds: string[];
}

export interface DomainDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  nameAr?: string;
  nameEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  reference?: string;
  status: SharedStatus;
  complianceStatus: ComplianceStatus;
  internalAssessmentStartDate?: string;
  internalAssessmentEndDate?: string;
  selfAssessmentStartDate?: string;
  selfAssessmentEndDate?: string;
  reviewStartDate?: string;
  reviewEndDate?: string;
  compliancePercentage: number;
  parentId?: string;
  mainDomainNameAr?: string;
  mainDomainNameEn?: string;
  frameworkId?: string;
  responsibleId?: string;
  responsibleName?: string;
  departments: NameId<string>[];
}

export interface DomainPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  frameworkId?: string;
  mainDomainId?: string;
  isMainDomain: boolean;
  search?: string;
  status?: SharedStatus;
}

export interface DomainWithoutPagingDto extends DomainDto {
  controls: ControlDto[];
  controlsCount: number;
}
