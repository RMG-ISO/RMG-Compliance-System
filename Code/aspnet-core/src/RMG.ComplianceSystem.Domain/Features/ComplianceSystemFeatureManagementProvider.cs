using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Volo.Abp.FeatureManagement;

namespace RMG.ComplianceSystem.Features
{
    internal class ComplianceSystemFeatureManagementProvider : FeatureManagementProvider, ITransientDependency
    {
        public ComplianceSystemFeatureManagementProvider(IFeatureManagementStore store) : base(store)
        {
        }

        public override string Name => "CS";
    }
}
