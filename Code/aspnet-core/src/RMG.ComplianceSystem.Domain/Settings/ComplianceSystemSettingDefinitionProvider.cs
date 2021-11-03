using Volo.Abp.Localization;
using Volo.Abp.Settings;

namespace RMG.ComplianceSystem.Settings
{
    public class ComplianceSystemSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            //Define your own settings here. Example:
            //context.Add(new SettingDefinition(ComplianceSystemSettings.MySetting1));

            context.Add(new SettingDefinition(LocalizationSettingNames.DefaultLanguage, "ar-EG"));

        }
    }
}
