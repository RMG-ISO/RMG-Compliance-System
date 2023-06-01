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
using Volo.Abp.Domain.Repositories;

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

        private readonly IAssessmentManager _assessmentManager;
        private readonly IFrameworkRepository _frameworkRepository;
        private readonly IDomainRepository _domainRepository;
        private readonly IControlRepository _controlRepository;
        private readonly IRepository<AssessmentVersion, Guid> _assessmentVersionRepository;

        public AssessmentAppService(
            IAssessmentManager assessmentManager,
            IAssessmentRepository repository,
            IFrameworkRepository frameworkRepository,
            IDomainRepository domainRepository,
            IControlRepository controlRepository,
            IRepository<AssessmentVersion, Guid> assessmentVersionRepository
            ) : base(repository)
        {
            _assessmentManager = assessmentManager;
            _frameworkRepository = frameworkRepository;
            _domainRepository = domainRepository;
            _controlRepository = controlRepository;
            _assessmentVersionRepository = assessmentVersionRepository;
        }

        protected override async Task<IQueryable<Assessment>> CreateFilteredQueryAsync(AssessmentPagedAndSortedResultRequestDto input)
        {
            return (await Repository.WithDetailsAsync());
        }

        protected override Task<Assessment> GetEntityByIdAsync(Guid id)
        {
            return Repository.GetAsync(id);
        }





        [Authorize]
        public override async Task<AssessmentDto> CreateAsync(CreateUpdateAssessmentDto input)
        {
            await CheckCreatePolicyAsync();
            await ValidateCreateUpdateAsync(input);
            var entity = await MapToEntityAsync(input);
            var control = await _controlRepository.GetAsync(input.ControlId);
            var framework = await _frameworkRepository.GetAsync(control.Domain.FrameworkId, false);
            _assessmentManager.CanCreateAssessment(framework.OwnerId, CurrentUser.Id.Value);

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

        [Authorize]
        public override async Task<AssessmentDto> UpdateAsync(Guid id, CreateUpdateAssessmentDto input)
        {
            //ToDo: what if resp is not granted required permission?
            await CheckUpdatePolicyAsync();
            var entity = await GetEntityByIdAsync(id);
            var domain = await _domainRepository.GetAsync(entity.Control.DomainId, false);
            var framework = await _frameworkRepository.GetAsync(domain.FrameworkId, false);
            if (framework.OwnerId == CurrentUser.Id)
                _assessmentManager.CanFrameworkOwnerUpdate(framework);
            if (domain.ResponsibleId == CurrentUser.Id)
                _assessmentManager.CanDomainResponsibleUpdate(framework, domain);
            if (input.Applicable != entity.Applicable)
                _assessmentManager.CanUpdateApplicableProperty(framework.OwnerId, CurrentUser.Id.Value);

            await ValidateCreateUpdateAsync(input);
            await SaveVersion(entity);

            // ToDo: keep this property in form?
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
            var dto = ObjectMapper.Map<Assessment, AssessmentDto>(ent);
            if (dto != null)
                dto.Versions = dto.Versions.OrderByDescending(v => v.CreationTime).ToList();
            return dto;

        }

        protected override async Task<AssessmentDto> MapToGetOutputDtoAsync(Assessment entity)
        {
            var dto = await base.MapToGetOutputDtoAsync(entity);
            dto.Versions = dto.Versions.OrderByDescending(v => v.CreationTime).ToList();
            return dto;
        }

        private async Task ValidateCreateUpdateAsync(CreateUpdateAssessmentDto input)
        {
            if (input.Documented.HasValue && input.Documented.Value == DocumentedType.PartialDocumented && !input.DocumentedPercentage.HasValue)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.YouMustProvidePercentageForPartialAnswers);

            if (input.Implemented.HasValue && input.Implemented.Value == ImplementedType.PartialImplemented && !input.ImplementedPercentage.HasValue)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.YouMustProvidePercentageForPartialAnswers);

            if (input.Effective.HasValue && input.Effective.Value == EffectiveType.PartialEffective && !input.EffectivePercentage.HasValue)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.YouMustProvidePercentageForPartialAnswers);

            if (((input.Documented.HasValue && input.Documented.Value != DocumentedType.NotDocumented) ||
                (input.Implemented.HasValue && input.Implemented.Value != ImplementedType.NotImplemented) ||
                (input.Effective.HasValue && input.Effective.Value != EffectiveType.NotEffective)) &&
                (input.Comment.IsNullOrWhiteSpace() || !input.AttachmentId.HasValue))
                throw new BusinessException(ComplianceSystemDomainErrorCodes.YouMustProvideCommentAndAttachmentWhenPartialOrFullAnswers);
        }

        private async Task SaveVersion(Assessment assessment)
        {
            var version = new AssessmentVersion(Guid.NewGuid());
            ObjectMapper.Map(assessment, version);
            await _assessmentVersionRepository.InsertAsync(version);
        }
    }
}
