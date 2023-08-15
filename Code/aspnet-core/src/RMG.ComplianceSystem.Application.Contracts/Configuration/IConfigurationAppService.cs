using RMG.ComplianceSystem.Configuration.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Configuration
{
    public interface IConfigurationAppService : IApplicationService
    {
        Task<List<ConfigurationDto>> GetAll();
        Task UpdateLogo(string logo);
    }
}
