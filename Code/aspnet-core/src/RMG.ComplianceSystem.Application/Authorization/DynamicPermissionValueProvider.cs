using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Guids;
using Volo.Abp.MultiTenancy;
using Volo.Abp.PermissionManagement;
using Volo.Abp.Security.Claims;

namespace RMG.ComplianceSystem.Authorization
{
    public class DynamicPermissionValueProvider : PermissionValueProvider
    {
        public const string ProviderName = "D";

        public override string Name => ProviderName;

        public DynamicPermissionValueProvider(IPermissionStore permissionStore)
        : base(permissionStore)
        {

        }

        public override async Task<PermissionGrantResult> CheckAsync(PermissionValueCheckContext context)
        {
            var userId = context.Principal?.FindFirst(AbpClaimTypes.UserId)?.Value;
            if (userId == null)
            {
                return PermissionGrantResult.Undefined;
            }

            return await PermissionStore.IsGrantedAsync(context.Permission.Name, Name, userId)
                ? PermissionGrantResult.Granted
                : PermissionGrantResult.Undefined;
        }

        public override async Task<MultiplePermissionGrantResult> CheckAsync(PermissionValuesCheckContext context)
        {
            var permissionNames = context.Permissions.Select(x => x.Name).Distinct().ToArray();
            Check.NotNullOrEmpty(permissionNames, nameof(permissionNames));

            var userId = context.Principal?.FindFirst(AbpClaimTypes.UserId)?.Value;
            if (userId == null)
            {
                return new MultiplePermissionGrantResult(permissionNames);
            }

            return await PermissionStore.IsGrantedAsync(permissionNames, Name, userId);
        }
    }
}
