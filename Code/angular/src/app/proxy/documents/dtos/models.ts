import type { DocumentType } from '../document-type.enum';
import type { CreationAuditedEntityDto, FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { DocumentStatus } from '../document-status.enum';
import type { NameId } from '../../shared/models';
import type { DocumentSectionStatus } from '../document-section-status.enum';

export interface CreateDocumentDto {
  name?: string;
  description?: string;
  type: DocumentType;
  ownersIds: string[];
  optionalReviewersIds: string[];
  requiredReviewersIds: string[];
  optionalApproversIds: string[];
  requiredApproversIds: string[];
  validationStartDate?: string;
  validationEndtDate: string;
  categoriesIds: string[];
  employeesIds: string[];
}

export interface CreateUpdateDocumentSectionDto {
  title: string;
  content: string;
  documentId: string;
}

export interface DocumentActionLogDto extends CreationAuditedEntityDto<string> {
  creatorName?: string;
  notes?: string;
  status: DocumentStatus;
}

export interface DocumentDto extends FullAuditedEntityDto<string> {
  lastModifierName?: string;
  creatorName?: string;
  code?: string;
  name?: string;
  type: DocumentType;
  owners: NameId<string>[];
  reviewers: DocumentEmployeeDto[];
  approvers: DocumentEmployeeDto[];
  validationStartDate?: string;
  validationEndtDate?: string;
  compliancePercentage: number;
  status: DocumentStatus;
  description?: string;
  categories: NameId<string>[];
  actionsLog: DocumentActionLogDto[];
}

export interface DocumentEmployeeDto extends NameId<string> {
  isRequired: boolean;
  employeeId?: string;
}

export interface DocumentGetListInputDto extends PagedAndSortedResultRequestDto {
  code?: string;
  name?: string;
}

export interface DocumentSectionDto extends FullAuditedEntityDto<string> {
  title?: string;
  content?: string;
  order: number;
  status: DocumentSectionStatus;
  documentId?: string;
}

export interface DocumentSectionGetListInputDto extends PagedAndSortedResultRequestDto {
  documentId?: string;
}

export interface RejectWithNotes {
  notes?: string;
}
