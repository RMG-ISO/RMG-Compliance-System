using System;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.Employees.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp;
using Volo.Abp.Data;
using Volo.Abp.Domain.Repositories;

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
        private readonly IDataFilter _dataFilter;


        public EmployeeAppService(
            IEmployeeRepository repository,
                        IDataFilter dataFilter
) : base(repository)
        {
            _repository = repository;
            _dataFilter = dataFilter;
        }

        protected override async Task<IQueryable<Employee>> CreateFilteredQueryAsync(EmployeePagedAndSortedResultRequestDto input)
        {
            return (await Repository.WithDetailsAsync())
                .WhereIf(!input.Search.IsNullOrEmpty(), t =>
                    t.FullName.Contains(input.Search) ||
                    t.Email.Contains(input.Search));
        }

        protected override Task<Employee> GetEntityByIdAsync(Guid id)
        {
            return Repository.GetAsync(id);
        }

        [Authorize]
        public async Task<ListResultDto<EmployeeDto>> GetEmployeeListLookupAsync()
        {
            var data = await Repository.GetListAsync();
            return new ListResultDto<EmployeeDto>(ObjectMapper.Map<List<Employee>, List<EmployeeDto>>(data));
        }

        [AllowAnonymous]
        [RemoteService(false)]
        public async Task CreateOrUpdateAsync(Guid id, string fullName, string email, bool isDeleted)
        {
            using (_dataFilter.Disable<ISoftDelete>())
            {
                var employee = await Repository.SingleOrDefaultAsync(t => t.Id == id);

                if (employee is null)
                    await Repository.InsertAsync(new Employee(id, fullName, email, null, false), autoSave: true);

                else if (isDeleted)
                    await Repository.DeleteAsync(employee, autoSave: true);

                else
                {
                    employee.FullName = fullName;
                    employee.Email = email;
                    employee.IsDeleted = isDeleted;

                    await Repository.UpdateAsync(employee, autoSave: true);
                }
            }

        }
    }
}
