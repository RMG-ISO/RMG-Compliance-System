using System;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.Frameworks.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using RMG.ComplianceSystem.Assessments;
using RMG.ComplianceSystem.Domains;
using RMG.ComplianceSystem.Controls;
using RMG.ComplianceSystem.Domains.Dtos;
using RMG.ComplianceSystem.Controls.Dtos;
using RMG.ComplianceSystem.Assessments.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Net.NetworkInformation;
using Volo.Abp;
using RMG.ComplianceSystem.Shared;
using DocumentFormat.OpenXml.Bibliography;
using RMG.ComplianceSystem.Notifications;
using RMG.ComplianceSystem.EmailTemplates;
using RMG.ComplianceSystem.Employees;
using Microsoft.Extensions.Configuration;
using Volo.Abp.TextTemplating.VirtualFiles;
using RMG.ComplianceSystem.Departments;
using Volo.Abp.Domain.Entities;
using System.Security.Policy;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.PermissionManagement;
using Volo.Abp.Identity;
using DocumentFormat.OpenXml.Office2010.Excel;
using System.Security;
using RMG.ComplianceSystem.Authorization;

namespace RMG.ComplianceSystem.Frameworks
{
    //ToDo: send notifications to selected users when creating/updating framework
    public class FrameworkAppService : CrudAppService<Framework, FrameworkDto, Guid, FrameworkPagedAndSortedResultRequestDto, CreateUpdateFrameworkDto, CreateUpdateFrameworkDto>,
        IFrameworkAppService
    {
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.Framework.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.Framework.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.Framework.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.Framework.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.Framework.Delete;


        private readonly IAssessmentRepository _assessmentRepository;
        private readonly IDomainRepository _domainRepository;
        private readonly IControlRepository _controlRepository;
        private readonly IFrameworkRepository _repository;
        private readonly IFrameworkEmployeeRepository _frameworkEmployeeRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IEmailTemplateRepository _emailTemplateRepository;
        private readonly IEmailTemplateAppService _emailTemplateAppService;
        private readonly INotificationRepository _notificationRepository;
        private readonly INotificationAppService _notificationAppService;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IdentityUserManager _identityUserManager;
        private readonly IConfiguration _configuration;
        private readonly IFrameworkManager _frameworkManager;
        private readonly IPermissionManager _permissionManager;


        public FrameworkAppService(IFrameworkRepository repository,
            IDomainRepository domainRepository,
            IControlRepository controlRepository,
            IAssessmentRepository assessmentRepository,
            IdentityUserManager identityUserManager,
            IEmployeeRepository employeeRepository,
            IEmailTemplateRepository emailTemplateRepository,
            IEmailTemplateAppService emailTemplateAppService,
            INotificationRepository notificationRepository,
            INotificationAppService notificationAppService,
            IConfiguration configuration,
            IDepartmentRepository departmentRepository,
            IPermissionManager permissionManager,
            IFrameworkManager frameworkManager,
            IFrameworkEmployeeRepository frameworkEmployeeRepository
            ) : base(repository)
        {
            _repository = repository;
            _assessmentRepository = assessmentRepository;
            _domainRepository = domainRepository;
            _controlRepository = controlRepository;
            _frameworkEmployeeRepository = frameworkEmployeeRepository;
            _emailTemplateRepository = emailTemplateRepository;
            _emailTemplateAppService = emailTemplateAppService;
            _employeeRepository = employeeRepository;
            _notificationRepository = notificationRepository;
            _notificationAppService = notificationAppService;
            _configuration = configuration;
            _departmentRepository = departmentRepository;
            _frameworkManager = frameworkManager;
            _identityUserManager = identityUserManager;
            _permissionManager = permissionManager;
        }

        public override async Task DeleteAsync(Guid id)
        {
            await CheckDeletePolicyAsync();
            var framework = await Repository.GetAsync(id, false);
            _frameworkManager.CanDelete(framework);
            await Repository.DeleteAsync(id, true);
        }

        public override async Task<FrameworkDto> CreateAsync(CreateUpdateFrameworkDto input)
        {
            try
            {
                //await GrantOwnerRequiredPermissionsAsync(input.OwnerId);
                var entity = await MapToEntityAsync(input);
                TryToSetTenantId(entity);
                entity.Status = SharedStatus.Inactive;
                await Repository.InsertAsync(entity, autoSave: true);

                if (input.FrameworkEmpsDto != null && input.FrameworkEmpsDto.Count > 0)
                {
                    List<FrameworkEmployee> ModelList = new List<FrameworkEmployee>();
                    foreach (var emp in input.FrameworkEmpsDto)
                    {
                        var FWEmployee = new FrameworkEmployee(entity.Id, emp.EmployeeId);
                        ModelList.Add(FWEmployee);
                    }
                    await _frameworkEmployeeRepository.InsertManyAsync(ModelList, autoSave: true);
                }


                var Framework = await GetEntityByIdAsync(entity.Id);


                // Notify reviewer
                await NotifyUsersAsync("FrameworkCreatedForReviewer", entity.ReviewUserId, NotificationSource.FrameworkCreatedForReviewer, NotySource.FrameworkCreatedForReviewer, entity.Id);

                // Notify approver
                await NotifyUsersAsync("FrameworkCreatedForApprover", entity.ReviewUserId, NotificationSource.FrameworkCreatedForApprover, NotySource.FrameworkCreatedForApprover, entity.Id);

                // Notify owner
                await NotifyUsersAsync("FrameworkCreatedForOwner", entity.ReviewUserId, NotificationSource.FrameworkCreatedForOwner, NotySource.FrameworkCreatedForOwner, entity.Id);

                return await MapToGetOutputDtoAsync(Framework);
            }
            catch (Exception)
            {

                throw;
            }

        }

        protected override async Task<FrameworkDto> MapToGetOutputDtoAsync(Framework entity)
        {
            var dto = await base.MapToGetOutputDtoAsync(entity);
            dto.OwnerName = (await _employeeRepository.FindAsync(dto.OwnerId, false))?.FullName;
            var empsIDs = _frameworkEmployeeRepository.Where(fe => fe.FrameworkId == dto.Id).Select(fe => fe.EmployeeId).ToList();
            foreach (var emp in empsIDs)
            {
                dto.FrameworkEmpsDto.Add(new FrameworkEmpDto
                {
                    EmployeeId = emp,
                    FrameworkId = dto.Id,
                    EmployeeName = (await _employeeRepository.FindAsync(emp, false))?.FullName
                });
            }
            dto.ManagementName = (await _departmentRepository.FindAsync(dto.ManagementId, false))?.Name;
            dto.ReviewUserName = (await _employeeRepository.FindAsync(dto.ReviewUserId, false))?.FullName;
            dto.ApproveUserName = (await _employeeRepository.FindAsync(dto.ApproveUserId, false))?.FullName;

            dto.CanSendForInternalAssessment = CanSendForInternalAssessment(entity).Item1;
            dto.CompliancePercentage = CalculateCompliancePercentage(dto.Id);
            dto.HasMainControl = HasMainControl(dto.Id);
            return dto;
        }

        public override async Task<FrameworkDto> UpdateAsync(Guid id, CreateUpdateFrameworkDto input)
        {
            try
            {
                //await GrantOwnerRequiredPermissionsAsync(input.OwnerId);
                bool shouldNotifyReviewer = false;
                bool shouldNotifyApprover = false;
                bool shouldNotifyOwner = false;
                var entity = await GetEntityByIdAsync(id);
                _frameworkManager.CanUpdate(entity);
                if (input.ReviewUserId != entity.ReviewUserId)
                    shouldNotifyReviewer = true;
                if (input.ApproveUserId != entity.ApproveUserId)
                    shouldNotifyApprover = true;
                if (input.OwnerId != entity.OwnerId)
                    shouldNotifyOwner = true;

                await MapToEntityAsync(input, entity);

                await Repository.UpdateAsync(entity, autoSave: true);


                #region [Employees]
                if (input.FrameworkEmpsDto != null && input.FrameworkEmpsDto.Count > 0)
                {
                    var Employees = _frameworkEmployeeRepository.Where(x => x.FrameworkId == entity.Id).ToList();
                    foreach (var emp in Employees)
                    {
                        await _frameworkEmployeeRepository.DeleteAsync(emp.Id, autoSave: true);
                    }


                    List<FrameworkEmployee> ModelList = new List<FrameworkEmployee>();
                    foreach (var emp in input.FrameworkEmpsDto)
                    {
                        var audtor = new FrameworkEmployee(entity.Id, emp.EmployeeId);
                        ModelList.Add(audtor);
                    }
                    await _frameworkEmployeeRepository.InsertManyAsync(ModelList, autoSave: true);

                }
                #endregion

                var audit = await GetEntityByIdAsync(id);

                // Notify reviewer
                if (shouldNotifyReviewer)
                    await NotifyUsersAsync("FrameworkCreatedForReviewer", entity.ReviewUserId, NotificationSource.FrameworkCreatedForReviewer, NotySource.FrameworkCreatedForReviewer, entity.Id);

                // Notify approver
                if (shouldNotifyApprover)
                    await NotifyUsersAsync("FrameworkCreatedForApprover", entity.ReviewUserId, NotificationSource.FrameworkCreatedForApprover, NotySource.FrameworkCreatedForApprover, entity.Id);

                // Notify owner
                if (shouldNotifyOwner)
                    await NotifyUsersAsync("FrameworkCreatedForOwner", entity.ReviewUserId, NotificationSource.FrameworkCreatedForOwner, NotySource.FrameworkCreatedForOwner, entity.Id);

                return await MapToGetOutputDtoAsync(audit);
            }
            catch (Exception)
            {

                throw;
            }

        }

        [Authorize]
        public override async Task<FrameworkDto> GetAsync(Guid id)
        {
            var dto = await base.GetAsync(id);
            foreach (var log in dto.ChangeStatusLogs.Where(l => l.CreatorId.HasValue))
            {
                log.CreatorName = (await _employeeRepository.GetAsync(log.CreatorId.Value))?.FullName;
            }
            var employeeIDs = _frameworkEmployeeRepository.Where(fe => fe.FrameworkId == dto.Id).Select(fe => fe.EmployeeId).ToList();
            var employees = _employeeRepository.Where(e => employeeIDs.Contains(e.Id)).Select(e => new FrameworkEmpDto
            {
                EmployeeId = e.Id,
                EmployeeName = e.FullName,
                FrameworkId = dto.Id,
            }).ToList();
            dto.FrameworkEmpsDto = employees;
            return dto;
        }

        [Authorize]
        public override async Task<PagedResultDto<FrameworkDto>> GetListAsync(FrameworkPagedAndSortedResultRequestDto input)
        {
            //await _permissionManager.SetAsync(ComplianceSystemPermissions.Framework.Default, "Dynamic", "bc963b63-307d-e31c-b4fb-3a0b980bbfa3", false);

            return await base.GetListAsync(input);
        }

        protected override async Task<IQueryable<Framework>> CreateFilteredQueryAsync(FrameworkPagedAndSortedResultRequestDto input)
        {
            var query = (await Repository.WithDetailsAsync())
                .WhereIf(!input.Search.IsNullOrEmpty(), t =>
                t.NameAr.Contains(input.Search) ||
                t.NameEn.Contains(input.Search) ||
                t.ShortcutAr.Contains(input.Search) ||
                t.ShortcutEn.Contains(input.Search) ||
                t.DescriptionAr.Contains(input.Search) ||
                t.DescriptionEn.Contains(input.Search))
                .WhereIf(input.Status.HasValue, t => t.Status == input.Status)
                .WhereIf(input.FrameworkStatus.HasValue, t => t.FrameworkStatus == input.FrameworkStatus);

            //var userRoles = await _identityUserManager.GetRolesAsync(await _identityUserManager.GetByIdAsync(CurrentUser.Id.Value));
            //var dynamicPermission = await _permissionManager.GetAsync(ComplianceSystemPermissions.Framework.Default, DynamicPermissionValueProvider.ProviderName, CurrentUser.Id.Value.ToString());
            //var directPermission = await _permissionManager.GetAsync(ComplianceSystemPermissions.Framework.Default, "U", CurrentUser.Id.Value.ToString());

            //bool foundPermission = false;
            //if (directPermission.IsGranted)
            //    foundPermission = true;
            //else
            //{
            //    foreach (var role in userRoles)
            //    {
            //        var permission = await _permissionManager.GetForRoleAsync(role, ComplianceSystemPermissions.Framework.Default);
            //        if (permission.IsGranted)
            //        {
            //            foundPermission = true;
            //            break;
            //        }
            //    }
            //}
            //if (!foundPermission)
            //{
            //    query = query.Where(f => _domainRepository.Where(d => d.ResponsibleId == CurrentUser.Id).Any(d => d.FrameworkId == f.Id)
            //                        || f.OwnerId == CurrentUser.Id
            //                        || f.ReviewUserId == CurrentUser.Id
            //                        || f.ApproveUserId == CurrentUser.Id);
            //}

            return query;
        }

        protected override Task<Framework> GetEntityByIdAsync(Guid id)
        {
            return Repository.GetAsync(id);
        }

        [Authorize]
        public async Task<ListResultDto<FrameworkDto>> GetFrameworkListLookupAsync()
        {
            var data = await Repository.GetListAsync();
            return new ListResultDto<FrameworkDto>(ObjectMapper.Map<List<Framework>, List<FrameworkDto>>(data));
        }


        public async Task<FrameworkData> GetFrameWorkWithAssesmentBYId(getFrameworkDto input)
        {
            var FrameworkDt = new FrameworkData();
            var item = _repository.Where(t => t.Id == input.FrameworkId).FirstOrDefault();
            if (item != null)
            {
                FrameworkDt.FrameworkDto = ObjectMapper.Map<Framework, FrameworkDto>(item);
                var ListMainDomainsDto = new List<MainDomainsDto>();
                var domainsWithChild = _domainRepository.Where(c => c.FrameworkId == item.Id).ToList();
                foreach (var Maindomain in domainsWithChild)
                {
                    var MainDomainsDto = new MainDomainsDto();
                    MainDomainsDto.Maindomain = ObjectMapper.Map<Domain, DomainDto>(Maindomain);
                    var listSubDomain = new List<SubDomainsDto>();
                    if (Maindomain.Children != null)
                        foreach (var domain in Maindomain.Children)
                        {
                            var subDomain = new SubDomainsDto();
                            subDomain.Subdomain = ObjectMapper.Map<Domain, DomainDto>(domain);
                            var controlsWithChild = _controlRepository.Where(e => e.DomainId == domain.Id).ToList();

                            var listmMaincontrol = new List<MainControlsDto>();
                            foreach (var control in controlsWithChild)
                            {
                                var maincontrol = new MainControlsDto();
                                maincontrol.MainControl = ObjectMapper.Map<Control, ControlDto>(control);
                                var Ctrols = new List<SubControlsDto>();
                                if (control.Children == null)
                                {
                                    var maincontrolassesment = _assessmentRepository.FirstOrDefault(u => u.ControlId == control.Id);
                                    maincontrol.AssessmentDto = ObjectMapper.Map<Assessment, AssessmentDto>(maincontrolassesment);
                                    if (maincontrolassesment != null)
                                    {
                                        if (maincontrolassesment.ComplianceLevel == ComplianceLevelType.ComplianceLevel1)
                                            MainDomainsDto.LevelOne += 1;
                                        if (maincontrolassesment.ComplianceLevel == ComplianceLevelType.ComplianceLevel2)
                                            MainDomainsDto.LevelTwo += 1;
                                        if (maincontrolassesment.ComplianceLevel == ComplianceLevelType.ComplianceLevel3)
                                            MainDomainsDto.LevelThree += 1;
                                        if (maincontrolassesment.ComplianceLevel == ComplianceLevelType.ComplianceLevel4)
                                            MainDomainsDto.Levelfour += 1;
                                        if (maincontrolassesment.ComplianceLevel == ComplianceLevelType.ComplianceLevel5)
                                            MainDomainsDto.LevelFive += 1;
                                        if (maincontrolassesment.Applicable == ApplicableType.Applicable)
                                            FrameworkDt.TotalApplicable += 1;
                                        if (maincontrolassesment.Applicable == ApplicableType.NotApplicable)
                                            FrameworkDt.TotalNotApplicable += 1;
                                    }
                                }
                                if (control.Children != null)
                                    foreach (var ctrl in control.Children)
                                    {
                                        var Ctrol = new SubControlsDto();
                                        Ctrol.subControl = ObjectMapper.Map<Control, ControlDto>(ctrl);
                                        var assesment = _assessmentRepository.FirstOrDefault(u => u.ControlId == ctrl.Id);
                                        Ctrol.AssessmentDto = ObjectMapper.Map<Assessment, AssessmentDto>(assesment);
                                        if (assesment != null)
                                        {
                                            if (assesment.ComplianceLevel == ComplianceLevelType.ComplianceLevel1)
                                                MainDomainsDto.LevelOne += 1;
                                            if (assesment.ComplianceLevel == ComplianceLevelType.ComplianceLevel2)
                                                MainDomainsDto.LevelTwo += 1;
                                            if (assesment.ComplianceLevel == ComplianceLevelType.ComplianceLevel3)
                                                MainDomainsDto.LevelThree += 1;
                                            if (assesment.ComplianceLevel == ComplianceLevelType.ComplianceLevel4)
                                                MainDomainsDto.Levelfour += 1;
                                            if (assesment.ComplianceLevel == ComplianceLevelType.ComplianceLevel5)
                                                MainDomainsDto.LevelFive += 1;
                                            if (assesment.Applicable == ApplicableType.Applicable)
                                                FrameworkDt.TotalApplicable += 1;
                                            if (assesment.Applicable == ApplicableType.NotApplicable)
                                                FrameworkDt.TotalNotApplicable += 1;
                                        }
                                        Ctrols.Add(Ctrol);
                                    }

                                maincontrol.subControl = Ctrols;
                                listmMaincontrol.Add(maincontrol);
                            }
                            subDomain.ChildrenControls = listmMaincontrol;
                            listSubDomain.Add(subDomain);
                        }

                    MainDomainsDto.ChildrenDomains = listSubDomain;
                    ListMainDomainsDto.Add(MainDomainsDto);
                }
                FrameworkDt.DomainDta = ListMainDomainsDto;


            }

            return FrameworkDt;
        }

        [HttpPut]
        public async Task SendToReviewer(Guid id)
        {
            var entity = await Repository.GetAsync(id, false);
            if (entity.FrameworkStatus != FrameworkStatus.NewFramework && entity.FrameworkStatus != FrameworkStatus.ReturnedToCreator)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.FrameworkOnlyNewCanBeSentToReviewer);

            //if (entity.CreatorId != CurrentUser.Id)
            //    throw new BusinessException(ComplianceSystemDomainErrorCodes.BIAOnlyCreatorUserCanSendToReviewer);

            entity.FrameworkStatus = FrameworkStatus.UnderReview;
            await Repository.UpdateAsync(entity, autoSave: true);
            entity.ChangeStatusLogs.Add(new FrameworkChangeStatusLog(Guid.NewGuid(), FrameworkStatus.UnderReview, entity.Id));

            // Notify reviewer
            await NotifyUsersAsync("FrameworkSentForRevision", entity.ReviewUserId, NotificationSource.FrameworkWorkflowAction, NotySource.FrameworkWorkflowAction, entity.Id);
        }

        [HttpPut]
        public async Task SendToOwner(Guid id)
        {
            var entity = await Repository.GetAsync(id, includeDetails: true);
            if (entity.FrameworkStatus != FrameworkStatus.UnderReview)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.FrameworkOnlySentToReviewerCanBeSentToOwner);

            //if (entity.BIAReviewers.Any() && entity.BIAReviewers.FirstOrDefault().ReviewerId != CurrentUser.Id)
            //    throw new BusinessException(ComplianceSystemDomainErrorCodes.BIAOnlyReviewerUserCanSendToOwner);

            entity.FrameworkStatus = FrameworkStatus.UnderApproval;
            await Repository.UpdateAsync(entity, autoSave: true);
            entity.ChangeStatusLogs.Add(new FrameworkChangeStatusLog(Guid.NewGuid(), FrameworkStatus.UnderApproval, entity.Id));

            await NotifyUsersAsync("FrameworkSentForApproval", entity.OwnerId, NotificationSource.FrameworkWorkflowAction, NotySource.FrameworkWorkflowAction, entity.Id);
        }

        [HttpPut]
        public async Task ReturnToCreator(Guid id, RejectFrameworkDto input)
        {
            var entity = await Repository.GetAsync(id);
            if (entity.FrameworkStatus != FrameworkStatus.UnderApproval && entity.FrameworkStatus != FrameworkStatus.UnderReview)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.FrameworkOnlySentToReviewerOrSentToOwnerCanBeReturnedToCreator);

            //if (entity.BIAReviewers.Any() && entity.BIAReviewers.FirstOrDefault().ReviewerId != CurrentUser.Id && entity.OwnerId != CurrentUser.Id)
            //    throw new BusinessException(ComplianceSystemDomainErrorCodes.BIAOnlyReviewerUserOrOwnerUserCanReturnToCreator);

            entity.FrameworkStatus = FrameworkStatus.ReturnedToCreator;
            await Repository.UpdateAsync(entity);
            entity.ChangeStatusLogs.Add(new FrameworkChangeStatusLog(Guid.NewGuid(), FrameworkStatus.ReturnedToCreator, entity.Id));

            await NotifyUsersAsync("FrameworkReturnedToCreator", entity.CreatorId.Value, NotificationSource.FrameworkWorkflowAction, NotySource.FrameworkWorkflowAction, entity.Id);
        }

        [HttpPut]
        public async Task Approve(Guid id)
        {
            var entity = await Repository.GetAsync(id);
            if (entity.FrameworkStatus != FrameworkStatus.UnderApproval)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.FrameworkOnlySentToOwnerCanBeApproved);

            //if (entity.OwnerId != CurrentUser.Id)
            //    throw new BusinessException(ComplianceSystemDomainErrorCodes.BIAOnlyOwnerUserCanApprove);

            entity.FrameworkStatus = FrameworkStatus.Approved;
            await Repository.UpdateAsync(entity);
            entity.ChangeStatusLogs.Add(new FrameworkChangeStatusLog(Guid.NewGuid(), FrameworkStatus.Approved, entity.Id));
            await NotifyUsersAsync("FrameworkApproved", entity.OwnerId, NotificationSource.FrameworkApproved, NotySource.FrameworkApproved, entity.Id);
        }

        [Authorize]
        [HttpPut]
        public async Task StartSelfAssessment(Guid id)
        {
            var framework = await Repository.GetAsync(id, false);
            if (framework.OwnerId != CurrentUser.Id)
                throw new EntityNotFoundException(typeof(Framework), id);

            var domains = _domainRepository.Where(d => d.FrameworkId == framework.Id).ToList();
            _frameworkManager.CanStartSelfAssessment(framework, domains.Where(d => !d.ParentId.HasValue).ToList());
            framework.SelfAssessmentStartDate = Clock.Now;
            framework.ComplianceStatus = ComplianceStatus.UnderPreparation;
            await Repository.UpdateAsync(framework);

            foreach (var domain in domains)
            {
                domain.ComplianceStatus = ComplianceStatus.UnderPreparation;
            }

            await _domainRepository.UpdateManyAsync(domains);
        }

        [Authorize]
        [HttpPut]
        public async Task Activate(Guid id)
        {
            var framework = await Repository.GetAsync(id);
            _frameworkManager.CanActivateDeactivate(framework, CurrentUser.Id.Value);
            framework.Status = SharedStatus.Active;
            await Repository.UpdateAsync(framework);
        }

        [Authorize]
        [HttpPut]
        public async Task Deactivate(Guid id)
        {
            var framework = await Repository.GetAsync(id);
            _frameworkManager.CanActivateDeactivate(framework, CurrentUser.Id.Value);
            framework.Status = SharedStatus.Inactive;
            await Repository.UpdateAsync(framework);
        }

        [Authorize]
        [HttpPut]
        public async Task SendForInternalAssessment(Guid id)
        {
            var framework = await Repository.GetAsync(id, false);
            if (framework.OwnerId != CurrentUser.Id)
                throw new EntityNotFoundException(typeof(Framework), id);

            if (framework.ComplianceStatus != ComplianceStatus.UnderPreparation)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.FrameworkMustBeUnderPreparationToSendForInternalAssessment);

            var canSend = CanSendForInternalAssessment(framework);
            if (!canSend.Item1)
                throw new BusinessException(ComplianceSystemDomainErrorCodes.TheFollowingControlsDonotHaveAssessmentsYet)
                    .WithData("controlsName", string.Join("، ", canSend.Item2));

            framework.ComplianceStatus = ComplianceStatus.ReadyForInternalAssessment;
            framework.SelfAssessmentEndDate = Clock.Now;
            foreach (var domain in canSend.Item3.Where(d => d.ResponsibleId.HasValue))
            {
                domain.ComplianceStatus = ComplianceStatus.ReadyForInternalAssessment;
                await NotifyUsersAsync("DomainStartInternalAssessment", domain.ResponsibleId.Value, NotificationSource.FrameworkEndSelfAssessment, NotySource.FrameworkEndSelfAssessment, id);
            }
        }

        [Authorize]
        [HttpPut]
        public async Task ApproveCompliance(Guid id)
        {
            var framework = await Repository.GetAsync(id, false);
            var domains = _domainRepository.Where(d => d.FrameworkId == framework.Id && !d.ParentId.HasValue).ToList();
            _frameworkManager.CanApproveCompliance(framework, domains, CurrentUser.Id.Value);
            framework.ComplianceStatus = ComplianceStatus.Approved;
            framework.ReviewEndDate = Clock.Now;
            await Repository.UpdateAsync(framework);
            foreach (var domain in domains)
            {
                await NotifyUsersAsync("FrameworkApproveCompliance", domain.ResponsibleId.Value, NotificationSource.FrameworkApproveCompliance, NotySource.FrameworkApproveCompliance, framework.Id);
            }
        }

        private Tuple<bool, List<string>, List<Domain>> CanSendForInternalAssessment(Framework framework)
        {
            var domains = _domainRepository.Where(d => d.FrameworkId == framework.Id).ToList();
            var controls = _controlRepository.Where(c => domains.Select(d => d.Id).Contains(c.DomainId)).Select(c => new { c.Id, c.NameAr }).ToList();
            var controlsWithoutAssessments = controls.Where(c => !_assessmentRepository.Any(a => a.ControlId == c.Id)).ToList();
            if (controlsWithoutAssessments.Any())
                return new Tuple<bool, List<string>, List<Domain>>(false, controlsWithoutAssessments.Select(c => c.NameAr).ToList(), null);
            return new Tuple<bool, List<string>, List<Domain>>(true, null, domains);
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
                        URL = Utility.GetURL(notificationSource, refId, null, null)
                    };
                    break;
                case NotificationSource.FrameworkApproved:
                    {
                        var framework = await Repository.GetAsync(refId, false);
                        emailTemplateModel = new FrameworkApprovedEmailDto
                        {
                            Name = Creator.FullName,
                            URL = Utility.GetURL(notificationSource, refId, null, null),
                            FrameworkNameAr = framework.NameAr,
                            FrameworkNameEn = framework.NameEn
                        };
                        break;
                    }
                case >= NotificationSource.FrameworkCreatedForReviewer and <= NotificationSource.FrameworkCreatedForOwner:
                    {
                        var framework = await Repository.GetAsync(refId, false);
                        emailTemplateModel = new FrameworkActionEmailDto
                        {
                            FrameworkNameAr = framework.NameAr,
                            FrameworkNameEn = framework.NameEn,
                            Name = Creator.FullName,
                            URL = Utility.GetURL(notificationSource, refId, null, null)
                        };
                        break;
                    }
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
                "Compliance System",
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

        //private async Task GrantOwnerRequiredPermissionsAsync(Guid userId)
        //{
        //    await _permissionManager.SetAsync(ComplianceSystemPermissions.Framework.Default, DynamicPermissionValueProvider.ProviderName, userId.ToString(), true);
        //    await _permissionManager.SetAsync(ComplianceSystemPermissions.Domain.Default, DynamicPermissionValueProvider.ProviderName, userId.ToString(), true);
        //    await _permissionManager.SetAsync(ComplianceSystemPermissions.Control.Default, DynamicPermissionValueProvider.ProviderName, userId.ToString(), true);
        //    await _permissionManager.SetAsync(ComplianceSystemPermissions.Assessment.Default, DynamicPermissionValueProvider.ProviderName, userId.ToString(), true);
        //    await _permissionManager.SetAsync(ComplianceSystemPermissions.Assessment.Create, DynamicPermissionValueProvider.ProviderName, userId.ToString(), true);
        //    await _permissionManager.SetAsync(ComplianceSystemPermissions.Assessment.Update, DynamicPermissionValueProvider.ProviderName, userId.ToString(), true);

        //}

        private bool HasMainControl(Guid frameworkId)
        {
            var domains = _domainRepository.Where(d => d.FrameworkId == frameworkId).Select(d => d.Id).ToList();
            return _controlRepository.Any(c => !c.ParentId.HasValue && domains.Contains(c.DomainId));
        }

        [RemoteService(false)]
        public int CalculateCompliancePercentage(Guid id)
        {
            var controls = new List<Guid>();
            var subDomains = _domainRepository.Where(d => d.FrameworkId == id && d.ParentId.HasValue).Select(d => d.Id).ToList();
            controls = _controlRepository.Where(c => subDomains.Contains(c.DomainId)).Select(c => c.Id).ToList();
            var assessments = _assessmentRepository.Where(a => controls.Contains(a.ControlId)).Select(a => new AssessmentCompliancePercentageDto
            {
                DocumentedPercentage = a.DocumentedPercentage,
                EffectivePercentage = a.EffectivePercentage,
                ImplementedPercentage = a.ImplementedPercentage
            }).ToList();
            return assessments.Any() ? (int)assessments.Average(a => a.CompliancePercentage) : 0;
        }

    }
}
