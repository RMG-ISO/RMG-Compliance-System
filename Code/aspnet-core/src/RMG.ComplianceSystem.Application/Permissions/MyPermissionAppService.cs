﻿//using Microsoft.Extensions.Options;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using Volo.Abp.Authorization.Permissions;
//using Volo.Abp.DependencyInjection;
//using Volo.Abp.Localization;
//using Volo.Abp.MultiTenancy;
//using Volo.Abp.PermissionManagement;
//using Volo.Abp.SimpleStateChecking;

//namespace RMG.ComplianceSystem.Permissions
//{
//    [Dependency(ReplaceServices = true)]
//    [ExposeServices(typeof(IPermissionAppService), typeof(PermissionAppService), typeof(MyPermissionAppService))]
//    public class MyPermissionAppService : PermissionAppService
//    {
//        public MyPermissionAppService(
//            IPermissionManager permissionManager, 
//            IPermissionDefinitionManager permissionDefinitionManager, 
//            IOptions<PermissionManagementOptions> options, 
//            ISimpleStateCheckerManager<PermissionDefinition> simpleStateCheckerManager) 
//            : base(permissionManager, permissionDefinitionManager, options, simpleStateCheckerManager)
//        {
//        }

//        public override async Task<GetPermissionListResultDto> GetAsync(string providerName, string providerKey)
//        {
//            await CheckProviderPolicy(providerName);

//            var result = new GetPermissionListResultDto
//            {
//                EntityDisplayName = providerKey,
//                Groups = new List<PermissionGroupDto>()
//            };

//            var multiTenancySide = CurrentTenant.GetMultiTenancySide();

//            foreach (var group in await PermissionDefinitionManager.GetGroupsAsync())
//            {
//                var groupDto = CreatePermissionGroupDto(group);

//                var neededCheckPermissions = new List<PermissionDefinition>();

//                foreach (var permission in group.GetPermissionsWithChildren()
//                                                .Where(x => x.IsEnabled)
//                                                .Where(x => !x.Providers.Any() || x.Providers.Contains(providerName))
//                                                .Where(x => x.MultiTenancySide.HasFlag(multiTenancySide)))
//                {
//                    if (await SimpleStateCheckerManager.IsEnabledAsync(permission))
//                    {
//                        neededCheckPermissions.Add(permission);
//                    }
//                }

//                if (!neededCheckPermissions.Any())
//                {
//                    continue;
//                }

//                var grantInfoDtos = neededCheckPermissions
//                    .Select(CreatePermissionGrantInfoDto)
//                    .ToList();

//                var multipleGrantInfo = await PermissionManager.GetAsync(neededCheckPermissions.Select(x => x.Name).ToArray(), providerName, providerKey);

//                foreach (var grantInfo in multipleGrantInfo.Result)
//                {
//                    var grantInfoDto = grantInfoDtos.First(x => x.Name == grantInfo.Name);

//                    grantInfoDto.IsGranted = grantInfo.IsGranted;

//                    foreach (var provider in grantInfo.Providers)
//                    {
//                        grantInfoDto.GrantedProviders.Add(new ProviderInfoDto
//                        {
//                            ProviderName = provider.Name,
//                            ProviderKey = provider.Key,
//                        });
//                    }

//                    groupDto.Permissions.Add(grantInfoDto);
//                }

//                if (groupDto.Permissions.Any())
//                {
//                    result.Groups.Add(groupDto);
//                }
//            }

//            return result;
//        }

//        private PermissionGrantInfoDto CreatePermissionGrantInfoDto(PermissionDefinition permission)
//        {
//            return new PermissionGrantInfoDto
//            {
//                Name = permission.Name,
//                DisplayName = permission.DisplayName?.Localize(StringLocalizerFactory),
//                ParentName = permission.Parent?.Name,
//                AllowedProviders = permission.Providers,
//                GrantedProviders = new List<ProviderInfoDto>()
//            };
//        }

//        private PermissionGroupDto CreatePermissionGroupDto(PermissionGroupDefinition group)
//        {
//            var localizableDisplayName = group.DisplayName as LocalizableString;

//            return new PermissionGroupDto
//            {
//                Name = group.Name,
//                DisplayName = group.DisplayName?.Localize(StringLocalizerFactory),
//                DisplayNameKey = localizableDisplayName?.Name,
//                DisplayNameResource = localizableDisplayName?.ResourceType != null
//                    ? LocalizationResourceNameAttribute.GetName(localizableDisplayName.ResourceType)
//                    : null,
//                Permissions = new List<PermissionGrantInfoDto>()
//            };
//        }

//    }
//}
