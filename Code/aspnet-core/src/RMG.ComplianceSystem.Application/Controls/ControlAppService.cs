using System;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.Controls.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.ComplianceSystem.Controls
{
    public class ControlAppService : CrudAppService<Control, ControlDto, Guid, ControlPagedAndSortedResultRequestDto, CreateUpdateControlDto, CreateUpdateControlDto>,
        IControlAppService
    {
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.Control.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.Control.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.Control.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.Control.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.Control.Delete;

        private readonly IControlRepository _repository;
        
        public ControlAppService(IControlRepository repository) : base(repository)
        {
            _repository = repository;
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
            ;
        }

        protected override Task<Control> GetEntityByIdAsync(Guid id)
        {
            return Repository.GetAsync(id);
        }
    }
}
