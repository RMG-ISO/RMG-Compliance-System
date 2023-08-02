import type { SharedStatus } from '../../shared/shared-status.enum';
import type { FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { IdentityUserDto } from '../../volo/abp/identity/models';
import type { ComplianceStatus } from '../../shared/compliance-status.enum';
import type { NameId } from '../../shared/models';
import type { ControlDto } from '../../controls/dtos/models';

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
  controlsCount: number;
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
  hasPriority?: boolean;
  isDocumented?: boolean;
  isEffective?: boolean;
  isImplemented?: boolean;
  level?: number;
  departmentId?: string;
  ownerId?: string;
}

export interface DomainWithoutPagingDto extends DomainDto {
  controls: ControlDto[];
  controlsCount: number;
}
