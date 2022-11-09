using RMG.ComplianceSystem.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Localization;

namespace RMG.ComplianceSystem.Permissions
{
    public class ComplianceSystemPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {

            context.RemoveGroup(FeatureManagementPermissions.GroupName);
            context.RemoveGroup("AbpTenantManagement");
            context.RemoveGroup("SettingManagement");

            var myGroup = context.AddGroup(ComplianceSystemPermissions.GroupName, L("Permission:SytemPermissions"));
            //Define your own permissions here. Example:
            //myGroup.AddPermission(ComplianceSystemPermissions.MyPermission1, L("Permission:MyPermission1"));


            //var booksPermission = myGroup.AddPermission(ComplianceSystemPermissions.Books.Default, L("Permission:Books"));
            //booksPermission.AddChild(ComplianceSystemPermissions.Books.Create, L("Permission:Books.Create"));
            //booksPermission.AddChild(ComplianceSystemPermissions.Books.Edit, L("Permission:Books.Edit"));
            //booksPermission.AddChild(ComplianceSystemPermissions.Books.Delete, L("Permission:Books.Delete"));

            //var authorsPermission = myGroup.AddPermission(
            //    ComplianceSystemPermissions.Authors.Default, L("Permission:Authors"));

            //authorsPermission.AddChild(
            //    ComplianceSystemPermissions.Authors.Create, L("Permission:Authors.Create"));

            //authorsPermission.AddChild(
            //    ComplianceSystemPermissions.Authors.Edit, L("Permission:Authors.Edit"));

            //authorsPermission.AddChild(
            //    ComplianceSystemPermissions.Authors.Delete, L("Permission:Authors.Delete"));

            //var attachmentPermission = myGroup.AddPermission(ComplianceSystemPermissions.Attachment.Default, L("Permission:Attachment"));
            //attachmentPermission.AddChild(ComplianceSystemPermissions.Attachment.Create, L("Permission:Create"));
            //attachmentPermission.AddChild(ComplianceSystemPermissions.Attachment.Update, L("Permission:Update"));
            //attachmentPermission.AddChild(ComplianceSystemPermissions.Attachment.Delete, L("Permission:Delete"));

            //var attachmentFilePermission = myGroup.AddPermission(ComplianceSystemPermissions.AttachmentFile.Default, L("Permission:AttachmentFile"));
            //attachmentFilePermission.AddChild(ComplianceSystemPermissions.AttachmentFile.Create, L("Permission:Create"));
            //attachmentFilePermission.AddChild(ComplianceSystemPermissions.AttachmentFile.Update, L("Permission:Update"));
            //attachmentFilePermission.AddChild(ComplianceSystemPermissions.AttachmentFile.Delete, L("Permission:Delete"));
            var DocumentPermission = myGroup.AddPermission(ComplianceSystemPermissions.Document.Default, L("Permission:Document"));
            DocumentPermission.AddChild(ComplianceSystemPermissions.Document.Create, L("Permission:Create"));
            DocumentPermission.AddChild(ComplianceSystemPermissions.Document.Update, L("Permission:Update"));
            DocumentPermission.AddChild(ComplianceSystemPermissions.Document.Delete, L("Permission:Delete"));
            DocumentPermission.AddChild(ComplianceSystemPermissions.Document.DownLoad, L("Permission:DownLoad"));

            var StaticDataPermission = myGroup.AddPermission(ComplianceSystemPermissions.StaticData.Default, L("Permission:StaticData"));
            StaticDataPermission.AddChild(ComplianceSystemPermissions.StaticData.Create, L("Permission:Create"));
            StaticDataPermission.AddChild(ComplianceSystemPermissions.StaticData.Update, L("Permission:Update"));
            StaticDataPermission.AddChild(ComplianceSystemPermissions.StaticData.Delete, L("Permission:Delete"));

            var InternalAuditApprove = myGroup.AddPermission(ComplianceSystemPermissions.InternalAuditApprove.Default, L("Permission:InternalAuditApprove"));
            InternalAuditApprove.AddChild(ComplianceSystemPermissions.InternalAuditApprove.Create, L("Permission:Create"));
            InternalAuditApprove.AddChild(ComplianceSystemPermissions.InternalAuditApprove.Update, L("Permission:Update"));
            InternalAuditApprove.AddChild(ComplianceSystemPermissions.InternalAuditApprove.Delete, L("Permission:Delete"));

            var InternalAuditQuestion = myGroup.AddPermission(ComplianceSystemPermissions.InternalAuditQuestion.Default, L("Permission:InternalAuditQuestion"));
            InternalAuditQuestion.AddChild(ComplianceSystemPermissions.InternalAuditQuestion.Create, L("Permission:Create"));
            InternalAuditQuestion.AddChild(ComplianceSystemPermissions.InternalAuditQuestion.Update, L("Permission:Update"));
            InternalAuditQuestion.AddChild(ComplianceSystemPermissions.InternalAuditQuestion.Delete, L("Permission:Delete"));

            var InternalAuditQuestionList = myGroup.AddPermission(ComplianceSystemPermissions.InternalAuditQuestionList.Default, L("Permission:InternalAuditQuestionList"));
            InternalAuditQuestionList.AddChild(ComplianceSystemPermissions.InternalAuditQuestionList.Create, L("Permission:Create"));
            InternalAuditQuestionList.AddChild(ComplianceSystemPermissions.InternalAuditQuestionList.Edit, L("Permission:Update"));
            InternalAuditQuestionList.AddChild(ComplianceSystemPermissions.InternalAuditQuestionList.Delete, L("Permission:Delete")); 

            var InternalAuditPreparation = myGroup.AddPermission(ComplianceSystemPermissions.InternalAuditPreparation.Default, L("Permission:InternalAuditPreparation"));
            InternalAuditPreparation.AddChild(ComplianceSystemPermissions.InternalAuditPreparation.Create, L("Permission:Create"));
            InternalAuditPreparation.AddChild(ComplianceSystemPermissions.InternalAuditPreparation.Update, L("Permission:Update"));
            InternalAuditPreparation.AddChild(ComplianceSystemPermissions.InternalAuditPreparation.Delete, L("Permission:Delete"));


            var EmailTemplatePermission = myGroup.AddPermission(ComplianceSystemPermissions.EmailTemplate.Default, L("Permission:EmailTemplate"));
            EmailTemplatePermission.AddChild(ComplianceSystemPermissions.EmailTemplate.Create, L("Permission:Create"));
            EmailTemplatePermission.AddChild(ComplianceSystemPermissions.EmailTemplate.Update, L("Permission:Update"));
            EmailTemplatePermission.AddChild(ComplianceSystemPermissions.EmailTemplate.Delete, L("Permission:Delete"));

            var RiskAndOpportunityPermission = myGroup.AddPermission(ComplianceSystemPermissions.RiskAndOpportunity.Default, L("Permission:RiskAndOpportunity"));
            RiskAndOpportunityPermission.AddChild(ComplianceSystemPermissions.RiskAndOpportunity.Create, L("Permission:Create"));
            RiskAndOpportunityPermission.AddChild(ComplianceSystemPermissions.RiskAndOpportunity.Update, L("Permission:Update"));
            RiskAndOpportunityPermission.AddChild(ComplianceSystemPermissions.RiskAndOpportunity.Delete, L("Permission:Delete"));
            RiskAndOpportunityPermission.AddChild(ComplianceSystemPermissions.RiskAndOpportunity.ReEvaluation, L("Permission:ReEvaluation"));
            RiskAndOpportunityPermission.AddChild(ComplianceSystemPermissions.RiskAndOpportunity.History, L("Permission:History"));
            RiskAndOpportunityPermission.AddChild(ComplianceSystemPermissions.RiskAndOpportunity.Definition, L("Permission:Definition"));
            RiskAndOpportunityPermission.AddChild(ComplianceSystemPermissions.RiskAndOpportunity.Analysis, L("Permission:Analysis"));
            RiskAndOpportunityPermission.AddChild(ComplianceSystemPermissions.RiskAndOpportunity.Evaluation, L("Permission:Evaluation"));
            RiskAndOpportunityPermission.AddChild(ComplianceSystemPermissions.RiskAndOpportunity.Treatment, L("Permission:Treatment"));
            RiskAndOpportunityPermission.AddChild(ComplianceSystemPermissions.RiskAndOpportunity.Review, L("Permission:Review"));

            var DocumentCategoryPermission = myGroup.AddPermission(ComplianceSystemPermissions.DocumentCategory.Default, L("Permission:DocumentCategory"));
            DocumentCategoryPermission.AddChild(ComplianceSystemPermissions.DocumentCategory.Create, L("Permission:Create"));
            DocumentCategoryPermission.AddChild(ComplianceSystemPermissions.DocumentCategory.Update, L("Permission:Update"));
            DocumentCategoryPermission.AddChild(ComplianceSystemPermissions.DocumentCategory.Delete, L("Permission:Delete"));

            var frameworkPermission = myGroup.AddPermission(ComplianceSystemPermissions.Framework.Default, L("Permission:Framework"));
            frameworkPermission.AddChild(ComplianceSystemPermissions.Framework.Create, L("Permission:Create"));
            frameworkPermission.AddChild(ComplianceSystemPermissions.Framework.Update, L("Permission:Update"));
            frameworkPermission.AddChild(ComplianceSystemPermissions.Framework.Delete, L("Permission:Delete"));

            var departmentPermission = myGroup.AddPermission(ComplianceSystemPermissions.Department.Default, L("Permission:Department"));
            departmentPermission.AddChild(ComplianceSystemPermissions.Department.Create, L("Permission:Create"));
            departmentPermission.AddChild(ComplianceSystemPermissions.Department.Update, L("Permission:Update"));
            departmentPermission.AddChild(ComplianceSystemPermissions.Department.Delete, L("Permission:Delete"));

            var employeePermission = myGroup.AddPermission(ComplianceSystemPermissions.Employee.Default, L("Permission:Employee"));
            employeePermission.AddChild(ComplianceSystemPermissions.Employee.Create, L("Permission:Create"));
            employeePermission.AddChild(ComplianceSystemPermissions.Employee.Update, L("Permission:Update"));
            employeePermission.AddChild(ComplianceSystemPermissions.Employee.Delete, L("Permission:Delete"));

            var domainPermission = myGroup.AddPermission(ComplianceSystemPermissions.Domain.Default, L("Permission:Domain"));
            domainPermission.AddChild(ComplianceSystemPermissions.Domain.Create, L("Permission:Create"));
            domainPermission.AddChild(ComplianceSystemPermissions.Domain.Update, L("Permission:Update"));
            domainPermission.AddChild(ComplianceSystemPermissions.Domain.Delete, L("Permission:Delete"));

            var controlPermission = myGroup.AddPermission(ComplianceSystemPermissions.Control.Default, L("Permission:Control"));
            controlPermission.AddChild(ComplianceSystemPermissions.Control.Create, L("Permission:Create"));
            controlPermission.AddChild(ComplianceSystemPermissions.Control.Update, L("Permission:Update"));
            controlPermission.AddChild(ComplianceSystemPermissions.Control.Delete, L("Permission:Delete"));

            var assessmentPermission = myGroup.AddPermission(ComplianceSystemPermissions.Assessment.Default, L("Permission:Assessment"));
            assessmentPermission.AddChild(ComplianceSystemPermissions.Assessment.Create, L("Permission:Create"));
            assessmentPermission.AddChild(ComplianceSystemPermissions.Assessment.Update, L("Permission:Update"));
            //assessmentPermission.AddChild(ComplianceSystemPermissions.Assessment.Delete, L("Permission:Delete"));

        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<ComplianceSystemResource>(name);
        }
    }
}
