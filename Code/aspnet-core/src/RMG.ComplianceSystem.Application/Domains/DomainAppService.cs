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

        private readonly IEmployeeRepository _employeeRepository;
        private readonly IFrameworkRepository _frameworkRepository;
        private readonly IEmailTemplateRepository _emailTemplateRepository;
        private readonly IEmailTemplateAppService _emailTemplateAppService;
        private readonly INotificationRepository _notificationRepository;
        private readonly INotificationAppService _notificationAppService;
        private readonly IPermissionGrantRepository _permissionGrantRepository;
        private readonly IdentityUserManager _identityUserManager;

        public DomainAppService(
            IDomainRepository repository,
            IEmailTemplateRepository emailTemplateRepository,
            IEmailTemplateAppService emailTemplateAppService,
            INotificationRepository notificationRepository,
            INotificationAppService notificationAppService, 
            IEmployeeRepository employeeRepository,
            IPermissionGrantRepository permissionGrantRepository,
            IdentityUserManager identityUserManager,
            IFrameworkRepository frameworkRepository) : base(repository)
        {
            _employeeRepository = employeeRepository;
            _frameworkRepository = frameworkRepository;
            _emailTemplateRepository = emailTemplateRepository;
            _emailTemplateAppService = emailTemplateAppService;
            _notificationRepository = notificationRepository;
            _notificationAppService = notificationAppService;
            _permissionGrantRepository = permissionGrantRepository;
            _identityUserManager = identityUserManager;
        }

        protected override async Task<IQueryable<Domain>> CreateFilteredQueryAsync(DomainPagedAndSortedResultRequestDto input)
        {
            var query = (await Repository.WithDetailsAsync())
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
            if (!foundPermission)
            {
                query = query.Where(d => d.ResponsibleId == CurrentUser.Id);
            }

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
            }
            else
            {
                var parent = await Repository.GetAsync(input.ParentId.Value);
                input.ResponsibleId = parent.ResponsibleId;
            }
            var entity = await MapToEntityAsync(input);

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

            return new ListResultDto<DomainWithoutPagingDto>(entityDtos);
        }


        public async Task StartInternalAssessment(Guid id)
        {
            var domain = await Repository.GetAsync(id);
            // ToDo: check if responsible and compliance status
            var framework = await _frameworkRepository.GetAsync(domain.FrameworkId, false);
            domain.InternalAssessmentStartDate = Clock.Now;
            domain.ComplianceStatus = ComplianceStatus.UnderInternalAssessment;
            if (!framework.InternalAssessmentStartDate.HasValue)
            {
                framework.InternalAssessmentStartDate = Clock.Now;
                framework.ComplianceStatus = ComplianceStatus.UnderInternalAssessment;
                await _frameworkRepository.UpdateAsync(framework);
            }
            await Repository.UpdateAsync(domain);
        }

        public async Task EndInternalAssessment(Guid id)
        {
            var domain = await Repository.GetAsync(id);
            // ToDo: check if responsible and compliance status
            // ToDo: update framework end date
            domain.InternalAssessmentEndDate = Clock.Now;
            domain.ComplianceStatus = ComplianceStatus.ReadyForRevision;
            await Repository.UpdateAsync(domain);

            //ToDo: notify framework owner
            //await NotifyUsersAsync("", )
        }


        private async Task NotifyUsersAsync(string emailTemplateKey, Guid receiverId, NotificationSource notificationSource, NotySource notySource, Guid refId)
        {
            List<Notification> notificationList = new List<Notification>();

            var emailTemplate = await _emailTemplateRepository.GetAsync(x => x.Key == emailTemplateKey);
            var Creator = _employeeRepository.FirstOrDefault(x => x.Id == receiverId);
            //Email Notification

            object emailTemplateModel = null;
            switch (notificationSource)
            {
                case NotificationSource.FrameworkWorkflowAction:
                    emailTemplateModel = new FrameworkActionEmailDto
                    {
                        Name = Creator.FullName,
                        URL = Utility.GetURL(NotificationSource.FrameworkWorkflowAction, refId, null, null)
                    };
                    break;
                case NotificationSource.FrameworkEndSelfAssessment:
                    emailTemplateModel = new FrameworkActionEmailDto
                    {
                        Name = Creator.FullName,
                        URL = Utility.GetURL(NotificationSource.FrameworkEndSelfAssessment, refId, null, null)
                    };
                    break;
                default:
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
    }
}
