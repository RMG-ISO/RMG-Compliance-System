using System;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Departments.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Departments
{
    public interface IDepartmentAppService :
        ICrudAppService< 
            DepartmentDto, 
            Guid, 
            DepartmentPagedAndSortedResultRequestDto,
            CreateUpdateDepartmentDto,
            CreateUpdateDepartmentDto>
    {
        Task<ListResultDto<DepartmentDto>> GetDepartmentListLookupAsync();
    }
}