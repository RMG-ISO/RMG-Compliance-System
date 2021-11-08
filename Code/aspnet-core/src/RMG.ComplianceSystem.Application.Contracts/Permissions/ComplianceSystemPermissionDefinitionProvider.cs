using RMG.ComplianceSystem.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace RMG.ComplianceSystem.Permissions
{
    public class ComplianceSystemPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var myGroup = context.AddGroup(ComplianceSystemPermissions.GroupName);
            //Define your own permissions here. Example:
            //myGroup.AddPermission(ComplianceSystemPermissions.MyPermission1, L("Permission:MyPermission1"));


            var booksPermission = myGroup.AddPermission(ComplianceSystemPermissions.Books.Default, L("Permission:Books"));
            booksPermission.AddChild(ComplianceSystemPermissions.Books.Create, L("Permission:Books.Create"));
            booksPermission.AddChild(ComplianceSystemPermissions.Books.Edit, L("Permission:Books.Edit"));
            booksPermission.AddChild(ComplianceSystemPermissions.Books.Delete, L("Permission:Books.Delete"));

            var authorsPermission = myGroup.AddPermission(
                ComplianceSystemPermissions.Authors.Default, L("Permission:Authors"));

            authorsPermission.AddChild(
                ComplianceSystemPermissions.Authors.Create, L("Permission:Authors.Create"));

            authorsPermission.AddChild(
                ComplianceSystemPermissions.Authors.Edit, L("Permission:Authors.Edit"));

            authorsPermission.AddChild(
                ComplianceSystemPermissions.Authors.Delete, L("Permission:Authors.Delete"));

            var attachmentPermission = myGroup.AddPermission(ComplianceSystemPermissions.Attachment.Default, L("Permission:Attachment"));
            attachmentPermission.AddChild(ComplianceSystemPermissions.Attachment.Create, L("Permission:Create"));
            attachmentPermission.AddChild(ComplianceSystemPermissions.Attachment.Update, L("Permission:Update"));
            attachmentPermission.AddChild(ComplianceSystemPermissions.Attachment.Delete, L("Permission:Delete"));

            var attachmentFilePermission = myGroup.AddPermission(ComplianceSystemPermissions.AttachmentFile.Default, L("Permission:AttachmentFile"));
            attachmentFilePermission.AddChild(ComplianceSystemPermissions.AttachmentFile.Create, L("Permission:Create"));
            attachmentFilePermission.AddChild(ComplianceSystemPermissions.AttachmentFile.Update, L("Permission:Update"));
            attachmentFilePermission.AddChild(ComplianceSystemPermissions.AttachmentFile.Delete, L("Permission:Delete"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<ComplianceSystemResource>(name);
        }
    }
}
