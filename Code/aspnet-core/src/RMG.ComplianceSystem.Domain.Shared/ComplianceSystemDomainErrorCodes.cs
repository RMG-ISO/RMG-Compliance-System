namespace RMG.ComplianceSystem
{
    public static class ComplianceSystemDomainErrorCodes
    {
        /* You can add your business exception error codes here, as constants */
        private const string ParentGroupName = "ComplianceSystem";
        private const string FrameworkGroupName = "Framework";
        private const string DomainGroupName = "Domain";
        private const string AssessmentGroupName = "Assessment";

        public const string AuthorAlreadyExists = "AngularMaterial:001";

        // Framework
        public const string FrameworkOnlyNewCanBeSentToReviewer = $"{ParentGroupName}:{FrameworkGroupName}:001";
        public const string FrameworkOnlySentToReviewerCanBeSentToOwner = $"{ParentGroupName}:{FrameworkGroupName}:002";
        public const string FrameworkOnlySentToReviewerOrSentToOwnerCanBeReturnedToCreator = $"{ParentGroupName}:{FrameworkGroupName}:003";
        public const string FrameworkOnlySentToOwnerCanBeApproved = $"{ParentGroupName}:{FrameworkGroupName}:004";
        public const string FrameworkOnlyUnderApprovalCanBeRejected = $"{ParentGroupName}:{FrameworkGroupName}:005";
        public const string FrameworkMustBeApprovedToStartSelfAssessment = $"{ParentGroupName}:{FrameworkGroupName}:006";
        public const string FrameworkMustBeActivatedToStartSelfAssessment = $"{ParentGroupName}:{FrameworkGroupName}:007";
        public const string TheFollowingControlsDonotHaveAssessmentsYet = $"{ParentGroupName}:{FrameworkGroupName}:008";
        public const string OnlyFrameworkOwnerCanActivateDeactivateFramework = $"{ParentGroupName}:{FrameworkGroupName}:009";
        public const string OnlyApprovedFrameworkCanBeActivatedDeactivated = $"{ParentGroupName}:{FrameworkGroupName}:010";
        public const string FrameworkCannotBeUpdatedAfterStartingSelfAssessment = $"{ParentGroupName}:{FrameworkGroupName}:011";
        public const string FrameworkMustBeUnderRevisionOrUnderReRevisionToApproveCompliance = $"{ParentGroupName}:{FrameworkGroupName}:012";
        public const string AllDomainsMustBeApprovedFirstToApproveFramework = $"{ParentGroupName}:{FrameworkGroupName}:013";
        public const string FrameworkMustBeUnderPreparationToSendForInternalAssessment = $"{ParentGroupName}:{FrameworkGroupName}:014";
        public const string CannotDeactivateFrameworkInsideComplianceLoop = $"{ParentGroupName}:{FrameworkGroupName}:015";
        public const string CannotDeleteFrameworkInsideComplianceLoop = $"{ParentGroupName}:{FrameworkGroupName}:016";
        public const string AllMainDomainsMustHaveResponsibleToStartSelfAssessment = $"{ParentGroupName}:{FrameworkGroupName}:017";

        // Domain
        public const string MainDomainNeedsResponsible = $"{ParentGroupName}:{DomainGroupName}:001";
        public const string DomainMustBeReadyForInternalAssessmentToStartInternalAssessment = $"{ParentGroupName}:{DomainGroupName}:002";
        public const string OnlyDomainResponsibleCanStartInternalAssessment = $"{ParentGroupName}:{DomainGroupName}:003";
        public const string DomainMustBeUnderInternalAssessmentToEndInternalAssessment = $"{ParentGroupName}:{DomainGroupName}:004";
        public const string DomainMustBeReadyForRevisionToStartReview = $"{ParentGroupName}:{DomainGroupName}:005";
        public const string OnlyFrameworkOwnerCanStartReview = $"{ParentGroupName}:{DomainGroupName}:006";
        public const string DomainMustBeUnderRevisionOrUnderReRevisionToReturnToResponsible = $"{ParentGroupName}:{DomainGroupName}:007";
        public const string OnlyFrameworkOwnerCanReturnToResponsible = $"{ParentGroupName}:{DomainGroupName}:008";
        public const string DomainMustBeUnderInternalReAssessmentToSendToOwner = $"{ParentGroupName}:{DomainGroupName}:009";
        public const string OnlyDomainResponsibleCanSendToOwner = $"{ParentGroupName}:{DomainGroupName}:010";
        public const string DomainMustBeUnderRevisionOrUnderReRevisionToApproveCompliance = $"{ParentGroupName}:{DomainGroupName}:011";
        public const string OnlyFrameworkOwnerCanApproveCompliance = $"{ParentGroupName}:{DomainGroupName}:012";


        // Assessment
        public const string YouMustStartSelfAssessmentForFrameworkFirst = $"{ParentGroupName}:{AssessmentGroupName}:001";
        public const string YouMustProvidePercentageForPartialAnswers = $"{ParentGroupName}:{AssessmentGroupName}:002";
        public const string YouMustProvideCommentWhenPartialOrFullAnswers = $"{ParentGroupName}:{AssessmentGroupName}:003";
        public const string OnlyFrameworkOwnerCanChangeAssessmentApplicable = $"{ParentGroupName}:{AssessmentGroupName}:004";
        public const string OnlyFrameworkOwnerCanStartAssessmentForControl = $"{ParentGroupName}:{AssessmentGroupName}:005";
        public const string AssessmentCanBeUpdatedByFrameworkOwnerWhenComplianceUnderPreparationOrUnderRevision = $"{ParentGroupName}:{AssessmentGroupName}:006";
        public const string AssessmentCanOnlyBeUpdatedByDomainResponsibleWhenComplianceUnderInternalAssessment = $"{ParentGroupName}:{AssessmentGroupName}:007";
        public const string YouMustAnswerPriorityQuestionForThisFrameworkControls = $"{ParentGroupName}:{AssessmentGroupName}:008";
    }
}
