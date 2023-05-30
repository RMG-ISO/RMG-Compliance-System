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
using System.IO;
using Volo.Abp.Content;
using ClosedXML.Excel;
using static RMG.ComplianceSystem.ComplianceSystemConsts;
using System.Data;
using FastMember;
using Microsoft.AspNetCore.Http;

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


        private readonly IAssessmentRepository _assessmentRepository;
        private readonly IDomainRepository _domainRepository;
        private readonly IControlRepository _controlRepository;
        private readonly IFrameworkRepository _repository;
        private readonly IFrameworkEmployeeRepository _frameworkEmployeeRepository;
        private readonly IEmailTemplateRepository _emailTemplateRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IEmailTemplateAppService _emailTemplateAppService;
        private readonly INotificationRepository _notificationRepository;
        private readonly INotificationAppService _notificationAppService;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IConfiguration _configuration;

        public FrameworkAppService(IFrameworkRepository repository,
            IDomainRepository domainRepository,
            IControlRepository controlRepository,
            IAssessmentRepository assessmentRepository,
            IEmailTemplateRepository emailTemplateRepository,
            IEmployeeRepository employeeRepository,
            IEmailTemplateAppService emailTemplateAppService,
            INotificationRepository notificationRepository,
            INotificationAppService notificationAppService,
            IConfiguration configuration,
            IDepartmentRepository departmentRepository,
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
        }



        public override async Task<FrameworkDto> CreateAsync(CreateUpdateFrameworkDto input)
        {
            try
            {
                var entity = await MapToEntityAsync(input);
                TryToSetTenantId(entity);
                await Repository.InsertAsync(entity, autoSave: true);

                if (input.FrameworkEmpsDto != null && input.FrameworkEmpsDto.Count > 0)
                {
                    List<FrameworkEmployee> ModelList = new List<FrameworkEmployee>();
                    foreach (var emp in input.FrameworkEmpsDto)
                    {
                        var FWEmployee = new FrameworkEmployee(entity.Id,emp.EmployeeId);
                        ModelList.Add(FWEmployee);
                    }
                    await _frameworkEmployeeRepository.InsertManyAsync(ModelList, autoSave: true);
                }
                

                var Framework = await GetEntityByIdAsync(entity.Id);

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
            return dto;
        }

        public override async Task<FrameworkDto> UpdateAsync(Guid id, CreateUpdateFrameworkDto input)
        {
            try
            {
                var entity = await GetEntityByIdAsync(id);

                await MapToEntityAsync(input, entity);

                await Repository.UpdateAsync(entity, autoSave: true);


                #region [Employees]
                if (input.FrameworkEmpsDto!= null && input.FrameworkEmpsDto.Count > 0)
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

                return await MapToGetOutputDtoAsync(audit);
            }
            catch (Exception)
            {

                throw;
            }

        }

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

        protected override async Task<IQueryable<Framework>> CreateFilteredQueryAsync(FrameworkPagedAndSortedResultRequestDto input)
        {
            return (await Repository.WithDetailsAsync())
                .WhereIf(!input.Search.IsNullOrEmpty(), t =>
                t.NameAr.Contains(input.Search) ||
                t.NameEn.Contains(input.Search) ||
                t.ShortcutAr.Contains(input.Search) ||
                t.ShortcutEn.Contains(input.Search) ||
                t.DescriptionAr.Contains(input.Search) ||
                t.DescriptionEn.Contains(input.Search))
                .WhereIf(input.Status.HasValue, t => t.Status == input.Status);
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
                                if(control.Children == null)
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
            await NotifyUsersAsync("FrameworkSentForRevision", entity.ReviewUserId, entity.Id);
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

            await NotifyUsersAsync("FrameworkSentForApproval", entity.OwnerId, entity.Id);
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

            await NotifyUsersAsync("FrameworkReturnedToCreator", entity.CreatorId.Value, entity.Id);
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
            // ToDo: send notification for owner
        }


        private async Task NotifyUsersAsync(string emailTemplateKey, Guid receiverId, Guid frameworkId)
        {
            List<Notification> notificationList = new List<Notification>();

            var emailTemplate = await _emailTemplateRepository.GetAsync(x => x.Key == emailTemplateKey);
            var Creator = _employeeRepository.FirstOrDefault(x => x.Id == receiverId);
            //Email Notification

            FrameworkActionEmailDto biaActionEmailDto = new FrameworkActionEmailDto
            {
                Name = Creator.FullName,
                URL = $"{_configuration["App:ClientUrl"]}{Utility.GetURL(NotificationSource.FrameworkWorkflowAction, frameworkId, null, null)}"
            };

            var expandoData = Utility.ConvertTypeToExpandoObject(biaActionEmailDto);
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
                Utility.GetURL(NotificationSource.FrameworkWorkflowAction, frameworkId, null, null),
                NotySource.FrameworkWorkflowAction,
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


        public async Task ImportExcelFileAsync([FromBody] IRemoteStreamContent file, Guid id)
        {
            var framework = await Repository.GetAsync(id);
            string fileExtension = Path.GetExtension(file.FileName);

            if (fileExtension != ".xlsx" && fileExtension != ".xls")
                throw new UserFriendlyException(L["InvalidFileContent"]);
            var stream = file.GetStream();
            var mainDomainsList = new List<Domain>();
            framework.Domains = mainDomainsList;
            using (var workbook = new XLWorkbook(stream))
            {

                foreach (var worksheet in workbook.Worksheets.Where(sheet => sheet.Visibility == XLWorksheetVisibility.Visible))
                {
                    //excel worksheet validation
                    var rows = worksheet.RangeUsed().Rows().Where(x => !x.IsMerged()).TakeWhile(x => !x.IsEmpty());

                    // get header row
                    var headerRow = rows.FirstOrDefault();

                    if (headerRow is not null)
                    {
                        var excelheaderAsString = headerRow.CellsUsed().Where(x => !x.IsEmpty()).Select(cell => cell.GetValue<string>().Trim().Replace(" ", string.Empty)).Take(FrameworkExcelFileHeaders.Count).ToList();

                        var result = FrameworkExcelFileHeaders.SequenceEqual(excelheaderAsString);
                        if (!result)
                        {
                            continue;
                        }
                    }
                    else continue;

                    // get all rows that contains data without header row

                    int colindex = 1;
                    int domainRefIndex = 1, domainNameIndex = 1, controllerNumIndex = 1, controllerNameIndex = 1, subControllerNumIndex = 1, subControllerNameIndex = 1;

                    foreach (var cell in headerRow.CellsUsed().Take(FrameworkExcelFileHeaders.Count))
                    {
                        switch (cell.GetValue<string>().Trim().Replace(" ", string.Empty))
                        {
                            case DomainReference:
                                domainRefIndex = colindex;
                                break;
                            case DomainName:
                                domainNameIndex = colindex;
                                break;
                            case ControllerName:
                                controllerNameIndex = colindex;
                                break;
                            case ControllerNumber:
                                controllerNumIndex = colindex;
                                break;
                            case SubControllerNum:
                                subControllerNumIndex = colindex;
                                break;
                            case SubControllerName:
                                subControllerNameIndex = colindex;
                                break;
                        }
                        colindex++;
                    }

                    //skip header row
                    rows = rows.Skip(1);

                    // create main domain (worksheet name)
                    var mainDomain = new Domain(GuidGenerator.Create(), worksheet.Name.Contains("-") ? worksheet.Name.Split('-')[1] : worksheet.Name,null, null, null, null, Shared.SharedStatus.Inactive, parentId: null, framework.Id);
                    mainDomainsList.Add(mainDomain);
                    // create sub Controllers and assigned it to main domain
                    var subDomainControllersLookup = rows.ToLookup(x => Tuple.Create(x.Cell(domainRefIndex).GetValue<string>(), x.Cell(domainNameIndex).GetValue<string>()), x => Tuple.Create(x.Cell(controllerNumIndex).GetValue<string>(), x.Cell(controllerNameIndex).GetValue<string>()));

                    var subControllersLookup = rows.ToLookup(x => x.Cell(controllerNumIndex).GetValue<string>(), x => Tuple.Create(x.Cell(subControllerNumIndex).GetValue<string>(), x.Cell(subControllerNameIndex).GetValue<string>()));
                    var subDomainsList = new List<Domain>();
                    mainDomain.Children = subDomainsList;
                    foreach (var item in subDomainControllersLookup.Where(x => !x.Key.Item2.IsNullOrEmpty()).Select(x => x.Key))
                    {
                        var subDomain = new Domain(GuidGenerator.Create(), item.Item2,null , null, null, item.Item1, Shared.SharedStatus.Inactive, parentId: mainDomain.Id, framework.Id);
                        subDomainsList.Add(subDomain);

                        subDomain.Controls = subDomainControllersLookup[item].Select(x => new Control(GuidGenerator.Create(),  x.Item2,null, null, null, x.Item1, Shared.SharedStatus.Inactive, parentId: null, subDomain.Id)).ToList();

                        var controllersDict = subDomain.Controls.ToDictionary(x => x.Id);

                        foreach (var key in controllersDict.Keys)
                        {
                            var mainControl = controllersDict[key];
                            mainControl.Children = subControllersLookup[mainControl.Reference].Select(x => new Control(GuidGenerator.Create(), x.Item2,null, null, null, null, Shared.SharedStatus.Inactive, mainControl.Id, mainControl.DomainId)).ToList();
                        }

                    }
                }
            }
            await Repository.UpdateAsync(framework, autoSave: true);
        }
        
        public IRemoteStreamContent GetTempExcelFile()
        {
            var dataTable = new DataTable();

            using (var reader = ObjectReader.Create(new List<string> { }, ExcelFileHeaderColumnsName.ToArray()))
            {
                dataTable.Load(reader);
            }

            using (var workbook = new XLWorkbook())
            {
                var workSheet = workbook.Worksheets.Add(dataTable, "Domain Name");
                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    var streamConent = new RemoteStreamContent(new MemoryStream(content), fileName: "Framework Template.xlsx");
                    streamConent.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    return streamConent;
                }
            }
        }

    }
}
      