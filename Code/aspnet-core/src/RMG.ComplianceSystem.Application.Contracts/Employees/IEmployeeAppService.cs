using System;
using System.Threading.Tasks;
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
        Task CreateOrUpdateAsync(Guid id, string fullName, string email,bool isDeleted);
    }
}