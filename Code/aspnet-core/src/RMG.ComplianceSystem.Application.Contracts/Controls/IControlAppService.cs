using System;
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

    }
}