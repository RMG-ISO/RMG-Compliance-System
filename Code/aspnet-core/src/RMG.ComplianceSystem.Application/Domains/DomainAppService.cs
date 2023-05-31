using System;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.Domains.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Controls.Dtos;
using Microsoft.AspNetCore.Authorization;
using RMG.ComplianceSystem.Employees;
using Volo.Abp;

namespace RMG.ComplianceSystem.Domains
{
    public class DomainAppService : CrudAppService<Domain, DomainDto, Guid, DomainPagedAndSortedResultRequestDto, CreateUpdateDomainDto, CreateUpdateDomainDto>,
        IDomainAppService
    {
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.Domain.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.Domain.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.Domain.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.Domain.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.Domain.Delete;

        private readonly IEmployeeRepository _employeeRepository;

        public DomainAppService(IDomainRepository repository, IEmployeeRepository employeeRepository) : base(repository)
        {
            _employeeRepository = employeeRepository;
        }

        protected override async Task<IQueryable<Domain>> CreateFilteredQueryAsync(DomainPagedAndSortedResultRequestDto input)
        {
            return (await Repository.WithDetailsAsync())
                .WhereIf(input.FrameworkId.HasValue, t => t.FrameworkId == input.FrameworkId)
                .WhereIf(input.IsMainDomain, t => t.ParentId == null)
                .WhereIf(!input.IsMainDomain, t => t.ParentId != null)
                .WhereIf(input.MainDomainId != null, t => t.ParentId == input.MainDomainId)
                .WhereIf(input.Status.HasValue, t => t.Status == input.Status)
                .WhereIf(!input.Search.IsNullOrEmpty(),
                   t => t.NameAr.Contains(input.Search) ||
                   t.NameEn.Contains(input.Search) ||
                   t.DescriptionAr.Contains(input.Search) ||
                   t.DescriptionEn.Contains(input.Search) ||
                   t.Reference.Contains(input.Search));

        }

        protected override Task<Domain> GetEntityByIdAsync(Guid id)
        {
            return Repository.GetAsync(id);
        }

        public override async Task<DomainDto> CreateAsync(CreateUpdateDomainDto input)
        {
            await CheckCreatePolicyAsync();
            if (!input.ParentId.HasValue)
            {
                if (!input.ResponsibleId.HasValue)
                    throw new BusinessException(ComplianceSystemDomainErrorCodes.MainDomainNeedsResponsible);
                await _employeeRepository.GetAsync(input.ResponsibleId.Value, false);
            }
            else
            {
                var parent = await Repository.GetAsync(input.ParentId.Value);
                input.ResponsibleId = parent.ResponsibleId;
            }
            var entity = await MapToEntityAsync(input);

            if (input.DepartmentIds is not null)
                foreach (var item in input.DepartmentIds)
                {
                    entity.AddDomainDepartment(new DomainDepartment(entity.Id, item));
                }

            TryToSetTenantId(entity);

            await Repository.InsertAsync(entity, autoSave: true);

            entity = await GetEntityByIdAsync(entity.Id);
            return await MapToGetOutputDtoAsync(entity);
        }

        public override async Task<DomainDto> UpdateAsync(Guid id, CreateUpdateDomainDto input)
        {
            await CheckUpdatePolicyAsync();

            var entity = await GetEntityByIdAsync(id);
            entity.DomainDepartments.Clear();
            await Repository.UpdateAsync(entity, autoSave: true);

            await MapToEntityAsync(input, entity);

            if (input.DepartmentIds is not null)
                foreach (var item in input.DepartmentIds)
                {
                    entity.AddDomainDepartment(new DomainDepartment(entity.Id, item));
                }

            await Repository.UpdateAsync(entity, autoSave: true);

            entity = await GetEntityByIdAsync(entity.Id);
            return await MapToGetOutputDtoAsync(entity);
        }

        protected override async Task<DomainDto> MapToGetOutputDtoAsync(Domain entity)
        {
            var dto = await base.MapToGetOutputDtoAsync(entity);
            if (dto.ResponsibleId.HasValue)
                dto.ResponsibleName = (await _employeeRepository.GetAsync(dto.ResponsibleId.Value))?.FullName;
            return dto;
        }

        [Authorize(ComplianceSystemPermissions.Assessment.Default)]
        public async Task<ListResultDto<DomainWithoutPagingDto>> GetListWithoutPagingAsync(DomainPagedAndSortedResultRequestDto input)
        {
            var query = await CreateFilteredQueryAsync(input);

            var entities = await AsyncExecuter.ToListAsync(query);
            
            var entityDtos = ObjectMapper.Map<List<Domain>, List<DomainWithoutPagingDto>>(entities);
            
            return new ListResultDto<DomainWithoutPagingDto>(entityDtos);
        }
    }
}
