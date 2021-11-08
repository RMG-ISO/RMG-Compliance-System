using System;
using RMG.ComplianceSystem.Frameworks.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Frameworks
{
    public interface IFrameworkAppService :
        ICrudAppService< 
            FrameworkDto, 
            Guid,
            FrameworkPagedAndSortedResultRequestDto,
            CreateUpdateFrameworkDto,
            CreateUpdateFrameworkDto>
    {

    }
}