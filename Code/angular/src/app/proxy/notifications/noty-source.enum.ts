import { mapEnumToOptions } from '@abp/ng.core';

export enum NotySource {
  RiskTreatment = 0,
  Risk = 1,
  InternalAuditPreparation = 2,
  FrameworkWorkflowAction = 3,
  FrameworkApproved = 4,
  FrameworkEndSelfAssessment = 5,
  DomainResponsibleEndInternalAssessment = 6,
  DomainApproveCompliance = 7,
  DomainReturnToResponsible = 8,
  DomainSentToOwner = 9,
  FrameworkApproveCompliance = 10,
  FrameworkCreatedForReviewer = 11,
  FrameworkCreatedForApprover = 12,
  FrameworkCreatedForOwner = 13,
  DocumentSentForRevision = 14,
  DocumentReturnedToContributor = 15,
  DocumentReviewedByUser = 16,
  DocumentSentForApproval = 17,
  DocumentApprovedByUser = 18,
  DocumentApproved = 19,
}

export const notySourceOptions = mapEnumToOptions(NotySource);
