using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Features;

namespace RMG.ComplianceSystem.Features
{
    public class ComplianceSystemFeatureDefinitionProvider : FeatureDefinitionProvider
    {
        public override void Define(IFeatureDefinitionContext context)
        {
            var group = context.AddGroup("App");
            group.AddFeature("Frameworks");

            group.AddFeature("ComplianceManagement");

            group.AddFeature("DocumentManagement");

            group.AddFeature("RiskManagement");
        }
    }
}
