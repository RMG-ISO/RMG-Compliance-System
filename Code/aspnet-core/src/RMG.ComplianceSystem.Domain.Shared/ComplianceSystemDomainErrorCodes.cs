namespace RMG.ComplianceSystem
{
    public static class ComplianceSystemDomainErrorCodes
    {
        /* You can add your business exception error codes here, as constants */
        private const string ParentGroupName = "ComplianceSystem";
        private const string FrameworkGroupName = "Framework";
        private const string DomainGroupName = "Domain";

        public const string AuthorAlreadyExists = "AngularMaterial:001";

        // Framework
        public const string FrameworkOnlyNewCanBeSentToReviewer = $"{ParentGroupName}:{FrameworkGroupName}:001";
        public const string FrameworkOnlySentToReviewerCanBeSentToOwner = $"{ParentGroupName}:{FrameworkGroupName}:002";
        public const string FrameworkOnlySentToReviewerOrSentToOwnerCanBeReturnedToCreator = $"{ParentGroupName}:{FrameworkGroupName}:003";
        public const string FrameworkOnlySentToOwnerCanBeApproved = $"{ParentGroupName}:{FrameworkGroupName}:004";
        public const string FrameworkOnlyUnderApprovalCanBeRejected = $"{ParentGroupName}:{FrameworkGroupName}:005";
        public const string FrameworkMustBeApprovedToStartSelfAssessment = $"{ParentGroupName}:{FrameworkGroupName}:006";
        public const string FrameworkMustBeActivatedToStartSelfAssessment = $"{ParentGroupName}:{FrameworkGroupName}:007";


        public const string FrameworkCannotBeUpdatedAfterStartingSelfAssessment = $"{ParentGroupName}:{FrameworkGroupName}:008";
        public const string OnlyFrameworkOwnerCanActivateDeactivateFramework = $"{ParentGroupName}:{FrameworkGroupName}:009";
        public const string OnlyApprovedFrameworkCanBeActivatedDeactivated = $"{ParentGroupName}:{FrameworkGroupName}:0010";


        // Domain
        public const string MainDomainNeedsResponsible = $"{ParentGroupName}:{DomainGroupName}:001";
    }
}
