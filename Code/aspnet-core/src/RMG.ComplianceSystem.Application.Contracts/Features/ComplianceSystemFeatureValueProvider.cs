using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Features;

namespace RMG.ComplianceSystem.Features
{
    public class ComplianceSystemFeatureValueProvider : FeatureValueProvider
    {
        public override string Name => "CS";
        public ComplianceSystemFeatureValueProvider(IFeatureStore featureStore) : base(featureStore)
        {
        }

        public override Task<string> GetOrNullAsync(FeatureDefinition feature)
        {
            return FeatureStore.GetOrNullAsync(feature.Name, Name, null);
        }
    }
}
