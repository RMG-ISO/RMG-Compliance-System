import type { FullAuditedEntityDto, FullAuditedEntityWithUserDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { DocumentSectionStatus } from '../../policies/document-section-status.enum';
import { IdentityUserDto } from '@abp/ng.identity/proxy';
import { UserData } from '@abp/ng.identity/proxy';
import { AttachmentDto } from '@proxy/attachments/dtos';

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

export interface CreateUpdateDocumentDto {
  TitleAr?: string;
  TitleEn?: string;
  CategoryId?: string;
  AttachmentId?: string;

}

export interface DocumentDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  TitleAr?: string;
  TitleEn?: string;
  CategoryId?: string;
  AttachmentId?: string;
  UserDto?: UserData;
  AttachmentDto?: AttachmentDto;
}

export interface DocPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
  CategoryId?: string;
}

// ////Document Category//////
export interface CreateUpdateDocumentCategoryDto {
  NameAr?: string;
  NameEn?: string;
  TenantId?: string;
}

export interface DocumentCategoryDto extends FullAuditedEntityWithUserDto<IdentityUserDto, string> {
  NameAr?: string;
  NameEn?: string;
  TenantId?: string;
}

export interface DocCategoryPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  search?: string;
}
