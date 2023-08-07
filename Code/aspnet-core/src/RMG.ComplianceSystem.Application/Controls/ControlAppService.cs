using System;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.Controls.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using RMG.ComplianceSystem.Domains.Dtos;
using System.Collections.Generic;
using Volo.Abp.ObjectMapping;
using RMG.ComplianceSystem.Domains;
using RMG.ComplianceSystem.Risks.Dtos;
using RMG.ComplianceSystem.Risks.Entity;
using RMG.ComplianceSystem.Assessments;
using RMG.ComplianceSystem.Assessments.Dtos;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Entities.Events.Distributed;
using RMG.ComplianceSystem.Shared;

namespace RMG.ComplianceSystem.Controls
{
    // ToDo: can add/update/delete control if framework inside compliance loop?

    public class ControlAppService : CrudAppService<Control, ControlDto, Guid, ControlPagedAndSortedResultRequestDto, CreateUpdateControlDto, CreateUpdateControlDto>,
        IControlAppService
    {
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.Control.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.Control.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.Control.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.Control.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.Control.Delete;
        private readonly IDomainRepository _domainRepository;
        private readonly IControlRepository _repository;
        private readonly IAssessmentRepository _assessmentRepository;

        public ControlAppService(
            IControlRepository repository,
            IDomainRepository domainRepository,
            IAssessmentRepository assessmentRepository) : base(repository)
        {
            _repository = repository;
            _domainRepository = domainRepository;
            _assessmentRepository = assessmentRepository;
        }


        protected override async Task<IQueryable<Control>> CreateFilteredQueryAsync(ControlPagedAndSortedResultRequestDto input)
        {
            return (await Repository.WithDetailsAsync())
                .WhereIf(input.IsMainControl, t => t.ParentId == null)
                .WhereIf(!input.IsMainControl, t => t.ParentId != null)
                .WhereIf(input.MainControlId != null, t => t.ParentId == input.MainControlId)
                .WhereIf(!input.Search.IsNullOrEmpty(),
                   t => t.NameAr.Contains(input.Search) ||
                   t.NameEn.Contains(input.Search) ||
                   t.DescriptionAr.Contains(input.Search) ||
                   t.DescriptionEn.Contains(input.Search) ||
                   t.Reference.Contains(input.Search))
                .WhereIf(input.DomainId.HasValue, t => t.DomainId == input.DomainId)
                .WhereIf(input.Status.HasValue, t => t.Status == input.Status);
        }

        protected override Task<Control> GetEntityByIdAsync(Guid id)
        {
            return Repository.GetAsync(id);
        }

        protected override async Task<ControlDto> MapToGetOutputDtoAsync(Control entity)
        {
            var dto = await base.MapToGetOutputDtoAsync(entity);
            var assessments = (await _assessmentRepository.GetQueryableAsync()).Where(a => a.ControlId == dto.Id).ToList();
            dto.CompliancePercentage = await CalculateCompliancePercentage(dto.Id);
            return dto;
        }

        public override async Task<PagedResultDto<ControlDto>> GetListAsync(ControlPagedAndSortedResultRequestDto input)
        {
            var list = await base.GetListAsync(input);
            if (input.IsMainControl)
            {
                foreach (var dto in list.Items)
                {
                    dto.SubControlsCount = await Repository.CountAsync(c => c.ParentId == dto.Id);
                }
            }
            return list;
        }

        [Authorize(ComplianceSystemPermissions.Assessment.Default)]
        public async Task<ListResultDto<ControlDto>> GetListWithoutPagingAsync(ControlPagedAndSortedResultRequestDto input)
        {
            var query = await CreateFilteredQueryAsync(input);

            var entities = await AsyncExecuter.ToListAsync(query);
            var entityDtos = await MapToGetListOutputDtosAsync(entities);

            if (input.IsMainControl)
            {
                foreach (var dto in entityDtos)
                {
                    dto.SubControlsCount = await Repository.CountAsync(c => c.ParentId == dto.Id);
                }
            }
            return new ListResultDto<ControlDto>(entityDtos);
        }

        public async Task<ListResultDto<ControlDto>> GetListControlsByFramworkAsync(ControlPagedAndSortedResultRequestDto input)
        {
           var   mainDomains = (await _domainRepository.GetQueryableAsync()).Where(t => t.FrameworkId == input.FrameWorkId).ToList();
            var ControlsDto = new List<ControlDto>();
            foreach (var domain in mainDomains)
            {
                if (domain.Children!=null)
                foreach (var item in domain.Children)
                {
                    var Controls = (await _repository.GetQueryableAsync()).Where(t => t.DomainId == item.Id).ToList();
                    ControlsDto = await MapToGetListOutputDtosAsync(Controls);
                }
            }
            return new ListResultDto<ControlDto>(ControlsDto);
        }

        public override async Task DeleteAsync(Guid id)
        {
            await CheckDeletePolicyAsync();
            await base.DeleteAsync(id);
            await Repository.DeleteManyAsync((await Repository.GetQueryableAsync()).Where(c => c.ParentId == id).Select(c => c.Id));
        }

        public async Task DeleteMany(List<Guid> ids)
        {
            await CheckDeletePolicyAsync();
            await Repository.DeleteManyAsync(ids);
            foreach (var item in ids)
            {
                await Repository.DeleteManyAsync((await Repository.GetQueryableAsync()).Where(c => c.ParentId == item).Select(c => c.Id));
            }
        }

        private async Task<int> CalculateCompliancePercentage(Guid id)
        {
            var assessments = (await _assessmentRepository.GetQueryableAsync()).Where(a => a.ControlId == id).Select(a => new AssessmentCompliancePercentageDto
            {
                DocumentedPercentage = a.DocumentedPercentage,
                EffectivePercentage = a.EffectivePercentage,
                ImplementedPercentage = a.ImplementedPercentage
            }).ToList();
            return assessments.Any() ? (int)assessments.Average(a => a.CompliancePercentage) : 0;
        }

        [AllowAnonymous]
        public async Task<PagedResultDto<NameId<Guid>>> GetListLookup(ControlLookupPagedResultRequestDto input)
        {
            var query = (await Repository.GetQueryableAsync()).WhereIf(!input.Search.IsNullOrEmpty(), x => x.NameAr.Contains(input.Search) || x.NameEn.Contains(input.Search));
            query = query.OrderByDescending(x => x.CreationTime);

            int count = query.Count();
            query = query.Skip(input.SkipCount).Take(input.MaxResultCount);
            var items = await AsyncExecuter.ToListAsync(query);
            return new PagedResultDto<NameId<Guid>>(count, ObjectMapper.Map<List<Control>, List<NameId<Guid>>>(items));
        }
    }
}
