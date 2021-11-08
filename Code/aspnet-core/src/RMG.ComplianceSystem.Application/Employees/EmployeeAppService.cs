using System;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.Employees.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.ComplianceSystem.Employees
{
    public class EmployeeAppService : CrudAppService<Employee, EmployeeDto, Guid, EmployeePagedAndSortedResultRequestDto, CreateUpdateEmployeeDto, CreateUpdateEmployeeDto>,
        IEmployeeAppService
    {
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.Employee.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.Employee.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.Employee.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.Employee.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.Employee.Delete;

        private readonly IEmployeeRepository _repository;
        
        public EmployeeAppService(IEmployeeRepository repository) : base(repository)
        {
            _repository = repository;
        }

        protected override async Task<IQueryable<Employee>> CreateFilteredQueryAsync(EmployeePagedAndSortedResultRequestDto input)
        {
            return (await Repository.WithDetailsAsync())
                .WhereIf(!input.Search.IsNullOrEmpty(), t => t.FullName.Contains(input.Search))
                .WhereIf(!input.Search.IsNullOrEmpty(), t => t.Email.Contains(input.Search));
        }

        protected override Task<Employee> GetEntityByIdAsync(Guid id)
        {
            return Repository.GetAsync(id);
        }

        public async Task<ListResultDto<EmployeeDto>> GetDepartmentListLookupAsync()
        {
            var data = await Repository.GetListAsync();
            return new ListResultDto<EmployeeDto>(ObjectMapper.Map<List<Employee>, List<EmployeeDto>>(data));
        }
    }
}
