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


            context.Add(new SettingDefinition(ComplianceSystemSettings.Attachment.IsMultiple, "true", isVisibleToClients: true));
            context.Add(new SettingDefinition(ComplianceSystemSettings.Attachment.MaxFileSize, "10", isVisibleToClients: true));
            context.Add(new SettingDefinition(ComplianceSystemSettings.Attachment.FileExtentions, "pdf,doc,docx,xls,xlsx,png,jpg,jpeg", isVisibleToClients: true));


        }
    }
}
