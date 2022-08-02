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
