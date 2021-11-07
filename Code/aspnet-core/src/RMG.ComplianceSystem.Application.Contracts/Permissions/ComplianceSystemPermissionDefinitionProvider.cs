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
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<ComplianceSystemResource>(name);
        }
    }
}
