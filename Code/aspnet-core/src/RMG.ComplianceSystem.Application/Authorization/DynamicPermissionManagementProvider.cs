using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Guids;
using Volo.Abp.MultiTenancy;
using Volo.Abp.PermissionManagement;

namespace RMG.ComplianceSystem.Authorization
{
    public class DynamicPermissionManagementProvider : PermissionManagementProvider
    {
        public override string Name => "D";

        public DynamicPermissionManagementProvider(
            IPermissionGrantRepository permissionGrantRepository,
            IGuidGenerator guidGenerator,
            ICurrentTenant currentTenant)
            : base(permissionGrantRepository, guidGenerator, currentTenant)
        {
            
        }
    }
}
