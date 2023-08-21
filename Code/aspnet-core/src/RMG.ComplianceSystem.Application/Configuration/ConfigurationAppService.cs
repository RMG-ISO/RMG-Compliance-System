using DocumentFormat.OpenXml.Office2010.Excel;
using RMG.ComplianceSystem.Attachments;
using RMG.ComplianceSystem.Configuration.Dtos;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.BlobStoring;
using Volo.Abp.Content;
using Volo.Abp.SettingManagement;
using Volo.Abp.Settings;

namespace RMG.ComplianceSystem.Configuration
{
    public class ConfigurationAppService : ComplianceSystemAppService, IConfigurationAppService
    {
        private readonly ISettingManager _settingManager;
        private readonly IBlobContainer<AttachmentFileContainer> _fileContainer;

        public ConfigurationAppService(ISettingManager settingManager, IBlobContainer<AttachmentFileContainer> fileContainer)
        {
            _settingManager = settingManager;
            _fileContainer = fileContainer;
        }

        public async Task<List<ConfigurationDto>> GetAll()
        {
            var list = await _settingManager.GetAllGlobalAsync();
            var res = list.Where(s => s.Name.StartsWith("App.")).Select(s => new ConfigurationDto(s.Name, s.Value, L[s.Name])).ToList();
            var logo = res.FirstOrDefault(r => r.Name == "App.Logo");
            if (logo != null)
                logo.Value = Encoding.Default.GetString((await _fileContainer.GetAsync(logo.Value)).GetAllBytes());
            return res;
        }

        public async Task UpdateLogo(UpdateLogoDto dto)
        {
            var guid = GuidGenerator.Create().ToString();
            await _fileContainer.SaveAsync(guid, dto.ImageAsBase64.GetBytes());
            await _settingManager.SetGlobalAsync("App.Logo", guid);
        }

    }
}
