using System;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.Assessments.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using System.Threading.Tasks;
using System.Linq;
using Volo.Abp;
using RMG.ComplianceSystem.Frameworks;
using RMG.ComplianceSystem.Domains;
using RMG.ComplianceSystem.Controls;
using Microsoft.AspNetCore.Authorization;

namespace RMG.ComplianceSystem.Assessments
{
    public class AssessmentAppService : CrudAppService<Assessment, AssessmentDto, Guid, AssessmentPagedAndSortedResultRequestDto, CreateUpdateAssessmentDto, CreateUpdateAssessmentDto>,
        IAssessmentAppService
    {
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.Assessment.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.Assessment.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.Assessment.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.Assessment.Update;
        //protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.Assessment.Delete;

        private readonly IAssessmentRepository _repository;
        private readonly IFrameworkRepository _frameworkRepository;
        private readonly IDomainRepository _domainRepository;
        private readonly IControlRepository _controlRepository;

        public AssessmentAppService(
            IAssessmentRepository repository,
            IFrameworkRepository frameworkRepository,
            IDomainRepository domainRepository,
            IControlRepository controlRepository
            ) : base(repository)
        {
            _repository = repository;
            _frameworkRepository = frameworkRepository;
            _domainRepository = domainRepository;
            _controlRepository = controlRepository;
        }

        protected override async Task<IQueryable<Assessment>> CreateFilteredQueryAsync(AssessmentPagedAndSortedResultRequestDto input)
        {
            return (await Repository.WithDetailsAsync());
        }

        protected override Task<Assessment> GetEntityByIdAsync(Guid id)
        {
            return Repository.GetAsync(id);
        }






        public override async Task<AssessmentDto> CreateAsync(CreateUpdateAssessmentDto input)
        {
            await CheckCreatePolicyAsync();

            var entity = await MapToEntityAsync(input);

            if (input.EmployeeIds is not null)
                foreach (var item in input.EmployeeIds)
                {
                    entity.AddAssessmentEmployee(new AssessmentEmployee(entity.Id, item));
                }

            entity.SetComplianceDate(Clock.Now);

            TryToSetTenantId(entity);

            await Repository.InsertAsync(entity, autoSave: true);

            entity = await GetEntityByIdAsync(entity.Id);
            return await MapToGetOutputDtoAsync(entity);
        }

        public override async Task<AssessmentDto> UpdateAsync(Guid id, CreateUpdateAssessmentDto input)
        {

            await CheckUpdatePolicyAsync();

            var entity = await GetEntityByIdAsync(id);
            entity.AssessmentEmployees.Clear();
            await Repository.UpdateAsync(entity, autoSave: true);

            await MapToEntityAsync(input, entity);

            if (input.EmployeeIds is not null)
                foreach (var item in input.EmployeeIds)
                {
                    entity.AddAssessmentEmployee(new AssessmentEmployee(entity.Id, item));
                }

            entity.SetComplianceDate(Clock.Now);
            await Repository.UpdateAsync(entity, autoSave: true);

            entity = await GetEntityByIdAsync(entity.Id);
            return await MapToGetOutputDtoAsync(entity);
        }

        [RemoteService(false)]
        public override Task<AssessmentDto> GetAsync(Guid id)
        {
            return base.GetAsync(id);
        }



        [RemoteService(false)]
        public override Task DeleteAsync(Guid id)
        {
            return base.DeleteAsync(id);
        }

        [RemoteService(false)]
        public override Task<PagedResultDto<AssessmentDto>> GetListAsync(AssessmentPagedAndSortedResultRequestDto input)
        {
            return base.GetListAsync(input);
        }

        [Authorize(ComplianceSystemPermissions.Assessment.Default)]
        public async Task<AssessmentDto> GetByControlIdAsync(Guid id)
        {
            var ent = (await Repository.WithDetailsAsync()).SingleOrDefault(t => t.ControlId == id);
            return ObjectMapper.Map<Assessment, AssessmentDto>(ent);

        }
    }
}
