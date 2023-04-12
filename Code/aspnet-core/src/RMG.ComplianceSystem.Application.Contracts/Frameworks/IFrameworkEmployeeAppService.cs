using System;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Frameworks.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Framework
{
    public interface IFrameworkEmployeeAppService :
        ICrudAppService< 
            FrameworkEmployeeDto, 
            Guid,
            FrameworkEmployeePagedAndSortedResultRequestDto,
            CreateUpdateFrameworkEmployeeDto,
            CreateUpdateFrameworkEmployeeDto>
    {
        Task<ListResultDto<FrameworkEmployeeDto>> GetFrameworkEmployeeListLookupAsync();
    }
}