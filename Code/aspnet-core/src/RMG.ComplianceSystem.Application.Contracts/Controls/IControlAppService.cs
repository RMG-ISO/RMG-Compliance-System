using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Controls.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Controls
{
    public interface IControlAppService :
        ICrudAppService< 
            ControlDto, 
            Guid, 
            ControlPagedAndSortedResultRequestDto,
            CreateUpdateControlDto,
            CreateUpdateControlDto>
    {
        Task DeleteMany(List<Guid> ids);

    }
}