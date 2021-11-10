using System;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.Domains.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Domains
{
    public class DomainAppService : CrudAppService<Domain, DomainDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateDomainDto, CreateUpdateDomainDto>,
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
    }
}
