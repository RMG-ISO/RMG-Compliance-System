namespace RMG.ComplianceSystem
{
    public static class ComplianceSystemDomainErrorCodes
    {
        /* You can add your business exception error codes here, as constants */
        private const string ParentGroupName = "ComplianceSystem";
        private const string FrameworkGroupName = "Framework";

        public const string AuthorAlreadyExists = "AngularMaterial:001";
        public const string FrameworkOnlyNewCanBeSentToReviewer = $"{ParentGroupName}:{FrameworkGroupName}:001";
        public const string FrameworkOnlySentToReviewerCanBeSentToOwner = $"{ParentGroupName}:{FrameworkGroupName}:002";
        public const string FrameworkOnlySentToReviewerOrSentToOwnerCanBeReturnedToCreator = $"{ParentGroupName}:{FrameworkGroupName}:003";
        public const string FrameworkOnlySentToOwnerCanBeApproved = $"{ParentGroupName}:{FrameworkGroupName}:004";
        public const string FrameworkOnlyUnderApprovalCanBeRejected = $"{ParentGroupName}:{FrameworkGroupName}:005";

    }
}
