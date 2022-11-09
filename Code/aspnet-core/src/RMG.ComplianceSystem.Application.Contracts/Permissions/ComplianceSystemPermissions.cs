namespace RMG.ComplianceSystem.Permissions
{
    public static class ComplianceSystemPermissions
    {
        public const string GroupName = "ComplianceSystem";

        //Add your own permission names. Example:
        //public const string MyPermission1 = GroupName + ".MyPermission1";

        public static class EmailTemplate
        {
            public const string Default = GroupName + ".EmailTemplate";
            public const string Create = Default + ".Create";
            public const string Update = Default + ".Update";
            public const string Delete = Default + ".Delete";
        }
        public static class InternalAuditApprove
        {
            public const string Default = GroupName + ".InternalAuditApprove";
            public const string Create = Default + ".Create";
            public const string Update = Default + ".Update";
            public const string Delete = Default + ".Delete";
        }
        
        public static class Books
        {
            public const string Default = GroupName + ".Books";
            public const string Create = Default + ".Create";
            public const string Edit = Default + ".Edit";
            public const string Delete = Default + ".Delete";
        }
        public static class InternalAuditPreparation

        {
            public const string Default = GroupName + ".InternalAuditPreparation";
            public const string Create = Default + ".Create";
            public const string Update = Default + ".Update";
            public const string Delete = Default + ".Delete";
        }
        public static class RiskTreatment
        {
            public const string Default = GroupName + ".RiskTreatment";
            public const string Create = Default + ".Create";
            public const string Update = Default + ".Update";
            public const string Delete = Default + ".Delete";
        }
        public static class StaticData
        {
            public const string Default = GroupName + ".StaticData";
            public const string Create = Default + ".Create";
            public const string Update = Default + ".Update";
            public const string Delete = Default + ".Delete";
        }
        public static class Document
        {
            public const string Default = GroupName + ".Document";
            public const string Create = Default + ".Create";
            public const string Update = Default + ".Update";
            public const string Delete = Default + ".Delete";
            public const string DownLoad = Default + ".DownLoad";
        }

        public class DocumentCategory
        {
            public const string Default = GroupName + ".DocumentCategory";
            public const string Update = Default + ".Update";
            public const string Create = Default + ".Create";
            public const string Delete = Default + ".Delete";
        }
        public class RiskAndOpportunity
        {
            public const string Default = GroupName + ".RiskAndOpportunity";
            public const string Update = Default + ".Update";
            public const string Create = Default + ".Create";
            public const string Delete = Default + ".Delete";
            public const string ReEvaluation = Default + ".ReEvaluation";
            public const string History = Default + ".History";
            public const string Definition = Default + "Definition";
            public const string Analysis = Default + "Analysis";
            public const string Evaluation = Default + "Evaluation";
            public const string Treatment = Default + "Treatment";
            public const string Review = Default + "Review";

        }
        
             public static class InternalAuditQuestion
        {
            public const string Default = GroupName + ".InternalAuditQuestion";
            public const string Create = Default + ".Create";
            public const string Update = Default + ".Update";
            public const string Delete = Default + ".Delete";
        }
        public static class InternalAuditQuestionList
        {
            public const string Default = GroupName + ".InternalAuditQuestionList";
            public const string Create = Default + ".Create";
            public const string Edit = Default + ".Edit";
            public const string Delete = Default + ".Delete";
        }
        public static class Authors
        {
            public const string Default = GroupName + ".Authors";
            public const string Create = Default + ".Create";
            public const string Edit = Default + ".Edit";
            public const string Delete = Default + ".Delete";
        }

        public class Attachment
        {
            public const string Default = GroupName + ".Attachment";
            public const string Update = Default + ".Update";
            public const string Create = Default + ".Create";
            public const string Delete = Default + ".Delete";
        }

        public class AttachmentFile
        {
            public const string Default = GroupName + ".AttachmentFile";
            public const string Update = Default + ".Update";
            public const string Create = Default + ".Create";
            public const string Delete = Default + ".Delete";
        }

        public class Framework
        {
            public const string Default = GroupName + ".Framework";
            public const string Update = Default + ".Update";
            public const string Create = Default + ".Create";
            public const string Delete = Default + ".Delete";
        }

        public class Department
        {
            public const string Default = GroupName + ".Department";
            public const string Update = Default + ".Update";
            public const string Create = Default + ".Create";
            public const string Delete = Default + ".Delete";
        }

        public class Employee
        {
            public const string Default = GroupName + ".Employee";
            public const string Update = Default + ".Update";
            public const string Create = Default + ".Create";
            public const string Delete = Default + ".Delete";
        }

        public class Domain
        {
            public const string Default = GroupName + ".Domain";
            public const string Update = Default + ".Update";
            public const string Create = Default + ".Create";
            public const string Delete = Default + ".Delete";
        }

        public class Control
        {
            public const string Default = GroupName + ".Control";
            public const string Update = Default + ".Update";
            public const string Create = Default + ".Create";
            public const string Delete = Default + ".Delete";
        }

        public class Assessment
        {
            public const string Default = GroupName + ".Assessment";
            public const string Update = Default + ".Update";
            public const string Create = Default + ".Create";
            //public const string Delete = Default + ".Delete";
        }


    }
}
