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
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<ComplianceSystemResource>(name);
        }
    }
}
