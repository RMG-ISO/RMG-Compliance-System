using RMG.ComplianceSystem.Subscription;
using System;
using Volo.Abp.Identity;
using Volo.Abp.Localization;
using Volo.Abp.Settings;

namespace RMG.ComplianceSystem.Settings
{
    public class ComplianceSystemSettingDefinitionProvider : SettingDefinitionProvider
    {
        private readonly IIdentityUserRepository _identityUserRepository;

        public ComplianceSystemSettingDefinitionProvider(IIdentityUserRepository identityUserRepository)
        {
            _identityUserRepository = identityUserRepository;
        }

        public override void Define(ISettingDefinitionContext context)
        {
            //Define your own settings here. Example:
            //context.Add(new SettingDefinition(ComplianceSystemSettings.MySetting1));
            var userCount = _identityUserRepository.GetCountAsync().Result;
            context.Add(new SettingDefinition(LocalizationSettingNames.DefaultLanguage, "ar-EG"));
            context.Add(new SettingDefinition(ComplianceSystemSettings.Subscription.RemainingDays, (SubscriptionDate.EndDate - DateTime.Now).Days.ToString(), isVisibleToClients : true));
            context.Add(new SettingDefinition(ComplianceSystemSettings.Subscription.RemainingUsersCount, (SubscriptionDate.MaxUserCount -  userCount).ToString(), isVisibleToClients : true));
            context.Add(new SettingDefinition(ComplianceSystemSettings.Attachment.IsMultiple, "true", isVisibleToClients: true));
            context.Add(new SettingDefinition(ComplianceSystemSettings.Attachment.MaxFileSize, "10", isVisibleToClients: true));
            context.Add(new SettingDefinition(ComplianceSystemSettings.Attachment.FileExtentions, "pdf,doc,docx,xls,xlsx,png,jpg,jpeg", isVisibleToClients: true));


        }
    }
}
