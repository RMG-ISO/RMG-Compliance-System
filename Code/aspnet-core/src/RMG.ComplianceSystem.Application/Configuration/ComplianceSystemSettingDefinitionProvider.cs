using RMG.ComplianceSystem.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Localization;
using Volo.Abp.Settings;

namespace RMG.ComplianceSystem.Configuration
{
    public class ComplianceSystemSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            context.Add(new SettingDefinition("App.Logo", Guid.Empty.ToString(), L("App.Logo")));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<ComplianceSystemResource>(name);
        }
    }
}
