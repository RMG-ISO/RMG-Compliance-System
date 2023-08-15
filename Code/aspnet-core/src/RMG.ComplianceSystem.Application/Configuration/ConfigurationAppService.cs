using RMG.ComplianceSystem.Configuration.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.SettingManagement;
using Volo.Abp.Settings;

namespace RMG.ComplianceSystem.Configuration
{
    public class ConfigurationAppService : ComplianceSystemAppService, IConfigurationAppService
    {
        private readonly ISettingManager _settingManager;

        public ConfigurationAppService(ISettingManager settingManager)
        {
            _settingManager = settingManager;
        }

        public async Task<List<ConfigurationDto>> GetAll()
        {
            var list = await _settingManager.GetAllGlobalAsync();
            return list.Where(s => s.Name.StartsWith("App.")).Select(s => new ConfigurationDto(s.Name, s.Value, L[s.Name])).ToList();
        }

        public async Task UpdateLogo(string logo)
        {
            await _settingManager.SetGlobalAsync("App.Logo", logo);
        }

    }
}
