using System;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.Domains.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        private readonly IDomainRepository _repository;

        public DomainAppService(IDomainRepository repository) : base(repository)
        {
            _repository = repository;
        }

        protected override async Task<IQueryable<Domain>> CreateFilteredQueryAsync(DomainPagedAndSortedResultRequestDto input)
        {
            return (await Repository.WithDetailsAsync())
                .WhereIf(input.IsMainDomain, t => t.ParentId == null)
                .WhereIf(!input.IsMainDomain, t => t.ParentId != null)
                .WhereIf(!input.Search.IsNullOrEmpty(), t => t.NameAr.Contains(input.Search))
                .WhereIf(!input.Search.IsNullOrEmpty(), t => t.NameEn.Contains(input.Search))
                .WhereIf(!input.Search.IsNullOrEmpty(), t => t.DescriptionAr.Contains(input.Search))
                .WhereIf(!input.Search.IsNullOrEmpty(), t => t.DescriptionEn.Contains(input.Search))
                .WhereIf(!input.Search.IsNullOrEmpty(), t => t.Reference.Contains(input.Search))
            ;
        }

        protected override Task<Domain> GetEntityByIdAsync(Guid id)
        {
            return Repository.GetAsync(id);
        }
    }
}
