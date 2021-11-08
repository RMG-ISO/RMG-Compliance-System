using System;
using RMG.ComplianceSystem.Employees.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Employees
{
    public interface IEmployeeAppService :
        ICrudAppService< 
            EmployeeDto, 
            Guid,
            EmployeePagedAndSortedResultRequestDto,
            CreateUpdateEmployeeDto,
            CreateUpdateEmployeeDto>
    {

    }
}