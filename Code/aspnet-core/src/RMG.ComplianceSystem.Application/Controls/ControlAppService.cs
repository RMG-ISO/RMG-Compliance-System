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

        public ControlAppService(IControlRepository repository, IDomainRepository domainRepository) : base(repository)
        {
            _repository = repository;
            _domainRepository = domainRepository;   
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


        [Authorize(ComplianceSystemPermissions.Assessment.Default)]
        public async Task<ListResultDto<ControlDto>> GetListWithoutPagingAsync(ControlPagedAndSortedResultRequestDto input)
        {
            var query = await CreateFilteredQueryAsync(input);

            var entities = await AsyncExecuter.ToListAsync(query);
            var entityDtos = await MapToGetListOutputDtosAsync(entities);

            return new ListResultDto<ControlDto>(entityDtos);
        }

        public async Task<ListResultDto<ControlDto>> GetListControlsByFramworkAsync(ControlPagedAndSortedResultRequestDto input)
        {
           var   mainDomains = _domainRepository.Where(t => t.FrameworkId == input.FrameWorkId).ToList();
            var ControlsDto = new List<ControlDto>();
            foreach (var domain in mainDomains)
            {
                if (domain.Children!=null)
                foreach (var item in domain.Children)
                {
                    var Controls = _repository.Where(t => t.DomainId == item.Id).ToList();
                    ControlsDto = await MapToGetListOutputDtosAsync(Controls);
                }
            }
            return new ListResultDto<ControlDto>(ControlsDto);
        }


        public async Task DeleteMany(List<Guid> ids)
        {
            await CheckDeletePolicyAsync();
            await Repository.DeleteManyAsync(ids);
        }

    }
}
