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
using RMG.ComplianceSystem.Frameworks;
using RMG.ComplianceSystem.Frameworks.Dtos;
using RMG.ComplianceSystem.Notifications;
using RMG.ComplianceSystem.Shared;
using RMG.ComplianceSystem.EmailTemplates;
using Volo.Abp.PermissionManagement;
using Volo.Abp.Identity;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.Domain.Repositories;
using DocumentFormat.OpenXml.Office2010.Excel;
using Volo.Abp.Domain.Entities;
using RMG.ComplianceSystem.Assessments;
using RMG.ComplianceSystem.Controls;
using RMG.ComplianceSystem.Assessments.Dtos;
using RMG.ComplianceSystem.Authorization;

namespace RMG.ComplianceSystem.Domains
{
    // ToDo: can add/update/delete domain if framework inside compliance loop?
    public class DomainAppService : CrudAppService<Domain, DomainDto, Guid, DomainPagedAndSortedResultRequestDto, CreateUpdateDomainDto, CreateUpdateDomainDto>,
        IDomainAppService
    {
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.Domain.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.Domain.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.Domain.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.Domain.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.Domain.Delete;

        private readonly IAssessmentRepository _assessmentRepository;
        private readonly IControlRepository _controlRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IFrameworkRepository _frameworkRepository;
        private readonly IEmailTemplateRepository _emailTemplateRepository;
        private readonly IEmailTemplateAppService _emailTemplateAppService;
        private readonly INotificationRepository _notificationRepository;
        private readonly INotificationAppService _notificationAppService;
        private readonly IPermissionGrantRepository _permissionGrantRepository;
        private readonly IdentityUserManager _identityUserManager;
        private readonly IDomainManager _domainManager;
        private readonly IPermissionManager _permissionManager;

        public DomainAppService(
            IDomainRepository repository,
            IEmailTemplateRepository emailTemplateRepository,
            IEmailTemplateAppService emailTemplateAppService,
            INotificationRepository notificationRepository,
            INotificationAppService notificationAppService,
            IEmployeeRepository employeeRepository,
            IPermissionGrantRepository permissionGrantRepository,
            IdentityUserManager identityUserManager,
            IFrameworkRepository frameworkRepository,
            IAssessmentRepository assessmentRepository,
            IControlRepository controlRepositor,
            IPermissionManager permissionManager,
            IDomainManager domainManager) : base(repository)
        {
            _employeeRepository = employeeRepository;
            _frameworkRepository = frameworkRepository;
            _emailTemplateRepository = emailTemplateRepository;
            _emailTemplateAppService = emailTemplateAppService;
            _notificationRepository = notificationRepository;
            _notificationAppService = notificationAppService;
            _permissionGrantRepository = permissionGrantRepository;
            _identityUserManager = identityUserManager;
            _domainManager = domainManager;
            _assessmentRepository = assessmentRepository;
            _controlRepository = controlRepositor;
            _permissionManager = permissionManager;
        }

        protected override async Task<IQueryable<Domain>> CreateFilteredQueryAsync(DomainPagedAndSortedResultRequestDto input)
        {
            var query = (await Repository.WithDetailsAsync())
                .WhereIf(input.HasPriority.HasValue, t => t.Framework.HasPriority == input.HasPriority.Value)
                .WhereIf(input.DepartmentId.HasValue, t => t.DomainDepartments.Any(dd => dd.DepartmentId == input.DepartmentId.Value))
                .WhereIf(input.OwnerId.HasValue, t => t.Framework.OwnerId == input.OwnerId.Value)
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

            var directPermission = await _permissionGrantRepository.FindAsync(ComplianceSystemPermissions.Domain.Default, "U", CurrentUser.Id.Value.ToString());
            var rolesPermissions = (await _permissionGrantRepository.GetListAsync()).Where(t => t.ProviderName == "R" && t.Name == ComplianceSystemPermissions.Domain.Default);

            bool foundPermission = false;
            if (directPermission != null)
                foundPermission = true;
            else
            {
                foreach (var role in rolesPermissions)
                {
                    var users = await _identityUserManager.GetUsersInRoleAsync(role.ProviderKey);
                    if (users.Any(u => u.Id == CurrentUser.Id.Value))
                    {
                        foundPermission = true;
                        break;
                    }
                }
            }
            //if (!foundPermission)
            //{
            //    query = query.Where(d => d.ResponsibleId == CurrentUser.Id);
            //}

            return query;
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
                //await GrantDomainResponsibleRequiredPermissionsAsync(input.ResponsibleId.Value);
            }
            else
            {
                var parent = await Repository.GetAsync(input.ParentId.Value);
                input.ResponsibleId = parent.ResponsibleId;
            }
            var framework = await _frameworkRepository.GetAsync(input.FrameworkId, false);
            var entity = await MapToEntityAsync(input);
            if (entity.ResponsibleId == framework.OwnerId)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.CannotAddDomainResponsibleSameAsFrameworkOwner);

            //if (framework.ComplianceStatus != ComplianceStatus.NotStarted && framework.ComplianceStatus != ComplianceStatus.Approved)
            //    throw new BusinessException(ComplianceSystemDomainErrorCodes.CannotAddDomainIfFrameworkInsideComplianceLoop);

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
            var entity = await GetEntityByIdAsync(id);
            var framework = await _frameworkRepository.GetAsync(input.FrameworkId, false);
            if (input.ResponsibleId == framework.OwnerId)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.CannotAddDomainResponsibleSameAsFrameworkOwner);

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
            dto.CompliancePercentage = CalculateCompliancePercentage(dto.Id, dto.ParentId.HasValue);
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
            if (input.IsMainDomain)
            {
                foreach (var dto in entityDtos)
                {
                    dto.CompliancePercentage = CalculateCompliancePercentage(dto.Id);
                }
            }
            return new ListResultDto<DomainWithoutPagingDto>(entityDtos);
        }

        [HttpPut]
        [Authorize]
        public async Task StartInternalAssessment(Guid id)
        {
            var domain = await Repository.GetAsync(id);
            _domainManager.CanStartInternalAssessment(domain, CurrentUser.Id.Value);
            var framework = await _frameworkRepository.GetAsync(domain.FrameworkId, false);
            domain.InternalAssessmentStartDate = Clock.Now;
            domain.ComplianceStatus = ComplianceStatus.UnderInternalAssessment;
            await UpdateSubdomains(id, ComplianceStatus.UnderInternalAssessment, true);
            if (!framework.InternalAssessmentStartDate.HasValue)
            {
                framework.InternalAssessmentStartDate = Clock.Now;
                framework.ComplianceStatus = ComplianceStatus.UnderInternalAssessment;
                await _frameworkRepository.UpdateAsync(framework);
            }
            await Repository.UpdateAsync(domain);
        }

        [HttpPut]
        [Authorize]
        public async Task EndInternalAssessment(Guid id)
        {
            var domain = await Repository.GetAsync(id);
            _domainManager.CanEndInternalAssessment(domain, CurrentUser.Id.Value);
            domain.InternalAssessmentEndDate = Clock.Now;
            domain.ComplianceStatus = ComplianceStatus.ReadyForRevision;
            await UpdateSubdomains(id, ComplianceStatus.ReadyForRevision, false, true);
            var framework = await _frameworkRepository.GetAsync(domain.FrameworkId, false);
            framework.ComplianceStatus = ComplianceStatus.ReadyForRevision;
            await Repository.UpdateAsync(domain);
            var isLastDomain = !(await Repository.GetQueryableAsync()).Any(d => d.FrameworkId == domain.FrameworkId && !d.ParentId.HasValue && d.Id != id && !d.InternalAssessmentEndDate.HasValue);
            if (isLastDomain)
            {
                framework.InternalAssessmentEndDate = Clock.Now;
                await _frameworkRepository.UpdateAsync(framework, true);
            }
            await NotifyUsersAsync("DomainEndInternalAssessment", framework.OwnerId, NotificationSource.DomainResponsibleEndInternalAssessment, NotySource.DomainResponsibleEndInternalAssessment, framework.Id);
        }

        public async Task DeleteMany(List<Guid> ids)
        {
            await CheckDeletePolicyAsync();
            await Repository.DeleteManyAsync(ids);
        }

        [Authorize]
        [HttpPut]
        public async Task StartReview(Guid id)
        {
            var domain = await Repository.GetAsync(id, false);
            var framework = await _frameworkRepository.GetAsync(domain.FrameworkId, false);
            _domainManager.CanStartReview(domain, framework.OwnerId, CurrentUser.Id.Value);
            domain.ComplianceStatus = ComplianceStatus.UnderRevision;
            domain.ReviewStartDate = Clock.Now;
            await UpdateSubdomains(id, ComplianceStatus.UnderRevision, false, false, true);
            framework.ComplianceStatus = ComplianceStatus.UnderRevision;
            if (!framework.ReviewStartDate.HasValue)
                framework.ReviewStartDate = Clock.Now;
            await Repository.UpdateAsync(domain);
            await _frameworkRepository.UpdateAsync(framework);
        }

        [Authorize]
        [HttpPut]
        public async Task ApproveCompliance(Guid id)
        {
            var domain = await Repository.GetAsync(id, false);
            var framework = await _frameworkRepository.GetAsync(domain.FrameworkId, false);
            _domainManager.CanApproveCompliance(domain, framework.OwnerId, CurrentUser.Id.Value);
            domain.ComplianceStatus = ComplianceStatus.Approved;
            domain.ReviewEndDate = Clock.Now;
            await UpdateSubdomains(id, ComplianceStatus.Approved, false, false, false, true);
            await Repository.UpdateAsync(domain);
            await NotifyUsersAsync("DomainApproveCompliance", domain.ResponsibleId.Value, NotificationSource.DomainApproveCompliance, NotySource.DomainApproveCompliance, domain.FrameworkId);
        }

        [Authorize]
        [HttpPut]
        public async Task ReturnToResponsible(Guid id)
        {
            var domain = await Repository.GetAsync(id, false);
            var framework = await _frameworkRepository.GetAsync(domain.FrameworkId, false);
            _domainManager.CanReturnToResponsible(domain, framework.OwnerId, CurrentUser.Id.Value);
            domain.ComplianceStatus = ComplianceStatus.UnderInternalReAssessment;
            await UpdateSubdomains(id, ComplianceStatus.UnderInternalReAssessment);
            await Repository.UpdateAsync(domain);
            await NotifyUsersAsync("DomainReturnToResponsible", domain.ResponsibleId.Value, NotificationSource.DomainReturnToResponsible, NotySource.DomainReturnToResponsible, domain.FrameworkId);
        }

        [Authorize]
        [HttpPut]
        public async Task SendToOwner(Guid id)
        {
            var domain = await Repository.GetAsync(id, false);
            _domainManager.CanSendToOwner(domain, CurrentUser.Id.Value);
            var framework = await _frameworkRepository.GetAsync(domain.FrameworkId, false);
            domain.ComplianceStatus = ComplianceStatus.UnderReRevision;
            await UpdateSubdomains(id, ComplianceStatus.UnderReRevision);
            await Repository.UpdateAsync(domain);
            await NotifyUsersAsync("DomainSentToOwner", framework.OwnerId, NotificationSource.DomainSentToOwner, NotySource.DomainSentToOwner, domain.FrameworkId);
        }

        private async Task NotifyUsersAsync(string emailTemplateKey, Guid receiverId, NotificationSource notificationSource, NotySource notySource, Guid refId)
        {
            List<Notification> notificationList = new List<Notification>();

            var emailTemplate = await _emailTemplateRepository.GetAsync(x => x.Key == emailTemplateKey);
            var Creator = await _employeeRepository.FirstOrDefaultAsync(x => x.Id == receiverId);
            //Email Notification

            object emailTemplateModel = null;
            switch (notificationSource)
            {
                case NotificationSource.FrameworkWorkflowAction:
                    emailTemplateModel = new FrameworkActionEmailDto
                    {
                        Name = Creator.FullName,
                        URL = Utility.GetURL(notificationSource, refId, null, null)
                    };
                    break;
                case NotificationSource.FrameworkEndSelfAssessment:
                    emailTemplateModel = new FrameworkActionEmailDto
                    {
                        Name = Creator.FullName,
                        URL = Utility.GetURL(notificationSource, refId, null, null)
                    };
                    break;
                case NotificationSource.DomainResponsibleEndInternalAssessment:
                    emailTemplateModel = new FrameworkActionEmailDto
                    {
                        Name = Creator.FullName,
                        URL = Utility.GetURL(notificationSource, refId, null, null)
                    };
                    break;
                default:
                    emailTemplateModel = new FrameworkActionEmailDto
                    {
                        Name = Creator.FullName,
                        URL = Utility.GetURL(notificationSource, refId, null, null)
                    };
                    break;
            }

            var expandoData = Utility.ConvertTypeToExpandoObject(emailTemplateModel);
            var emailTemplateData = await _emailTemplateAppService.RenderTemplate(emailTemplateKey, expandoData);

            var notification = new Notification(
                Guid.NewGuid(),
                "ComplianceSystem",
                null,
                Creator.Email,
                null,
                null,
                emailTemplate.Subject,
                Priority.Normal,
                NotificationType.Email,
                Notifications.Status.Created,
                Clock.Now,
                emailTemplateData.Body,
                true,
                true,
                null,
                null,
                null,
                null,
                false
            );
            notificationList.Add(notification);

            //Push Notification

            var PushNotification = new Notification(
                Guid.NewGuid(),
                "ComplianceSystem",
                null,
                Creator.Id.ToString(),
                null,
                null,
                emailTemplate.Subject,
                Priority.Normal,
                NotificationType.Push,
                Notifications.Status.NotSeen,
                Clock.Now,
                emailTemplate.NotificationBody,
                true,
                true,
                null,
                Utility.GetURL(notificationSource, refId, null, null),
                notySource,
                null,
                false
            );
            notificationList.Add(PushNotification);
            await _notificationRepository.InsertManyAsync(notificationList, true);
            foreach (var not in notificationList.Where(t => t.Type == NotificationType.Push))
            {
                await _notificationAppService.NotifyUser(Guid.Parse(not.To));

            }
        }


        private int CalculateCompliancePercentage(Guid id, bool hasParent = false)
        {
            var controls = new List<Guid>();
            if (hasParent)
                controls = _controlRepository.Where(c => c.DomainId == id).Select(c => c.Id).ToList();
            else
            {
                var subDomains = Repository.Where(d => d.ParentId == id).Select(d => d.Id).ToList();
                controls = _controlRepository.Where(c => subDomains.Contains(c.DomainId)).Select(c => c.Id).ToList();
            }
            var assessments = _assessmentRepository.Where(a => controls.Contains(a.ControlId)).Select(a => new AssessmentCompliancePercentageDto
            {
                DocumentedPercentage = a.DocumentedPercentage,
                EffectivePercentage = a.EffectivePercentage,
                ImplementedPercentage = a.ImplementedPercentage
            }).ToList();
            return assessments.Any() ? (int)assessments.Average(a => a.CompliancePercentage) : 0;
        }

        private async Task UpdateSubdomains(
            Guid parentId,
            ComplianceStatus status,
            bool updateInternalAssessmentStartDate = false,
            bool updateInternalAssessmentEndDate = false,
            bool updateReviewStartDate = false,
            bool updateReviewEndDate = false)
        {
            var children = (await Repository.GetQueryableAsync()).Where(d => d.ParentId == parentId).ToList();
            foreach (var child in children)
            {
                child.ComplianceStatus = status;
                if (updateInternalAssessmentStartDate)
                    child.InternalAssessmentStartDate = Clock.Now;
                if (updateInternalAssessmentEndDate)
                    child.InternalAssessmentEndDate = Clock.Now;
                if (updateReviewStartDate)
                    child.ReviewStartDate = Clock.Now;
                if (updateReviewEndDate)
                    child.ReviewEndDate = Clock.Now;
            }
        }


        //private async Task GrantDomainResponsibleRequiredPermissionsAsync(Guid userId)
        //{
        //    await _permissionManager.SetAsync(ComplianceSystemPermissions.Framework.Default, DynamicPermissionValueProvider.ProviderName, userId.ToString(), true);
        //    await _permissionManager.SetAsync(ComplianceSystemPermissions.Domain.Default, DynamicPermissionValueProvider.ProviderName, userId.ToString(), true);
        //    await _permissionManager.SetAsync(ComplianceSystemPermissions.Control.Default, DynamicPermissionValueProvider.ProviderName, userId.ToString(), true);
        //    await _permissionManager.SetAsync(ComplianceSystemPermissions.Assessment.Default, DynamicPermissionValueProvider.ProviderName, userId.ToString(), true);
        //    await _permissionManager.SetAsync(ComplianceSystemPermissions.Assessment.Update, DynamicPermissionValueProvider.ProviderName, userId.ToString(), true);

        //}
    }
}
