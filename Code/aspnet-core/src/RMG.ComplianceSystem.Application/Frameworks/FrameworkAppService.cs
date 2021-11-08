using System;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.Frameworks.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Frameworks
{
    public class FrameworkAppService : CrudAppService<Framework, FrameworkDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateFrameworkDto, CreateUpdateFrameworkDto>,
        IFrameworkAppService
    {
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.Framework.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.Framework.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.Framework.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.Framework.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.Framework.Delete;

        private readonly IFrameworkRepository _repository;
        
        public FrameworkAppService(IFrameworkRepository repository) : base(repository)
        {
            _repository = repository;
        }
    }
}
