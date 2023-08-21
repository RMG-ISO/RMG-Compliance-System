namespace RMG.ComplianceSystem.Settings
{
    public static class ComplianceSystemSettings
    {
        private const string Prefix = "ComplianceSystem";

        //Add your own setting names here. Example:
        //public const string MySetting1 = Prefix + ".MySetting1";


        //Module Attachment
        public static class Attachment
        {
            private const string AttachmentModule = ".Attachment";

            public const string IsMultiple = Prefix + AttachmentModule + ".IsMultiple";
            public const string MaxFileSize = Prefix + AttachmentModule + ".MaxFileSize";
            public const string FileExtentions = Prefix + AttachmentModule + ".FileExtentions";
        }

        public static class Subscription 
        {
            public const string SubscriptionModule = ".Subscription";


            public const string ElapsedDays = Prefix + SubscriptionModule + ".ElapsedDays";
            public const string RemainingUsersCount = Prefix + SubscriptionModule + ".RemainingUsersCount";
        }
    }
}