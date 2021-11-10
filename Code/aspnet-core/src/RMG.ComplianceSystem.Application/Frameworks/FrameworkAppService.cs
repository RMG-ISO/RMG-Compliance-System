using System;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.Frameworks.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace RMG.ComplianceSystem.Frameworks
{
    public class FrameworkAppService : CrudAppService<Framework, FrameworkDto, Guid, FrameworkPagedAndSortedResultRequestDto, CreateUpdateFrameworkDto, CreateUpdateFrameworkDto>,
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


        protected override async Task<IQueryable<Framework>> CreateFilteredQueryAsync(FrameworkPagedAndSortedResultRequestDto input)
        {
            return (await Repository.WithDetailsAsync())
                .WhereIf(!input.Search.IsNullOrEmpty(), t =>
                t.NameAr.Contains(input.Search) ||
                t.NameEn.Contains(input.Search) ||
                t.ShortcutAr.Contains(input.Search) ||
                t.ShortcutEn.Contains(input.Search) ||
                t.DescriptionAr.Contains(input.Search) ||
                t.DescriptionEn.Contains(input.Search));
        }

        protected override Task<Framework> GetEntityByIdAsync(Guid id)
        {
            return Repository.GetAsync(id);
        }

        public async Task<ListResultDto<FrameworkDto>> GetFrameworkListLookupAsync()
        {
            var data = await Repository.GetListAsync();
            return new ListResultDto<FrameworkDto>(ObjectMapper.Map<List<Framework>, List<FrameworkDto>>(data));
        }
    }
}
