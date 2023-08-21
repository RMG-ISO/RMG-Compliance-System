using RMG.ComplianceSystem.Localization;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Features;
using Volo.Abp.Localization;

namespace RMG.ComplianceSystem.Features
{
    public class ComplianceSystemFeatureDefinitionProvider : FeatureDefinitionProvider
    {
        public override void Define(IFeatureDefinitionContext context)
        {
            var group = context.AddGroup("App");
            group.AddFeature("Frameworks", "true" , displayName: LocalizableString
                                 .Create<ComplianceSystemResource>("Framework"));

            group.AddFeature("ComplianceManagement", "false", displayName: LocalizableString
                                 .Create<ComplianceSystemResource>("Assessment"));

            group.AddFeature("DocumentManagement", "true" ,
                displayName: LocalizableString
                                 .Create<ComplianceSystemResource>("Menu:DocumentsManagement"));
            group.AddFeature("PoliciesManagement", "true", displayName: LocalizableString.Create<ComplianceSystemResource>("Document:Policies"));


            group.AddFeature("RiskManagement", "false" , displayName: LocalizableString
                                 .Create<ComplianceSystemResource>("Menu:RiskManagement"));
        }
    }
}
