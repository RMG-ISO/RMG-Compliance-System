using System;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.Departments.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace RMG.ComplianceSystem.Departments
{
    public class DepartmentAppService : CrudAppService<Department, DepartmentDto, Guid, DepartmentPagedAndSortedResultRequestDto, CreateUpdateDepartmentDto, CreateUpdateDepartmentDto>,
        IDepartmentAppService
    {
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.Department.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.Department.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.Department.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.Department.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.Department.Delete;

        private readonly IDepartmentRepository _repository;

        public DepartmentAppService(IDepartmentRepository repository) : base(repository)
        {
            _repository = repository;
        }

        protected override async Task<IQueryable<Department>> CreateFilteredQueryAsync(DepartmentPagedAndSortedResultRequestDto input)
        {
            return (await Repository.WithDetailsAsync())
                .WhereIf(!input.Search.IsNullOrEmpty(), t => t.Name.Contains(input.Search));
        }

        protected override Task<Department> GetEntityByIdAsync(Guid id)
        {
            return Repository.GetAsync(id);
        }

        [Authorize]
        public async Task<ListResultDto<DepartmentDto>> GetDepartmentListLookupAsync()
        {
            var data = await Repository.GetListAsync();
            return new ListResultDto<DepartmentDto>(ObjectMapper.Map<List<Department>, List<DepartmentDto>>(data));
        }
    }
}
