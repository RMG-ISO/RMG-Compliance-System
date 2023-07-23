import type { FullAuditedEntityDto, FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { DocumentSectionStatus } from '../../policies/document-section-status.enum';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

export interface CreateUpdateDocumentSectionDto {
  title: string;
  content: string;
  documentId: string;
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

export interface CreateUpdateDocumentCategoryDto {
  nameAr: string;
  nameEn: string;
  tenantId?: string;
}

export interface DocCategoryPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
}

export interface DocumentCategoryDto extends FullAuditedEntityWithUserDto<string, IdentityUserDto> {
  nameAr?: string;
  nameEn?: string;
  tenantId?: string;
}
