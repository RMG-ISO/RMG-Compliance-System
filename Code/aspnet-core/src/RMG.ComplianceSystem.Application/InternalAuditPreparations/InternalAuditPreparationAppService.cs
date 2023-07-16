using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;
using RMG.ComplianceSystem.Frameworks.Dtos;
using RMG.ComplianceSystem.Frameworks;
using RMG.ComplianceSystem.InternalAuditPreparation.Dto;
using RMG.ComplianceSystem.InternalAuditPreparation;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.Departments;
using RMG.ComplianceSystem.Departments.Dtos;
using Department = RMG.ComplianceSystem.Departments.Department;
using Framework = RMG.ComplianceSystem.Frameworks.Framework;
using IdentityServer4.Validation;
using RMG.ComplianceSystem.DepartmentUsers;
using RMG.ComplianceSystem.Employees;
using RMG.ComplianceSystem.Employees.Dtos;
using Volo.Abp.ObjectMapping;
using RMG.ComplianceSystem.Risks.IRepository;
using RMG.ComplianceSystem.Risks.Dtos;
using RMG.ComplianceSystem.Risks.Entity;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.InternalAuditPreparations
{
    // [Authorize(ComplianceSystemPermissions.InternalAuditPreparation.Default)]
    public class InternalAuditPreparationAppService :
        CrudAppService<
            InternalAuditPreparation, //The InternalAuditPreparation entity
            InternalAuditPreparationDto, //Used to show InternalAuditPreparations
            Guid, //Primary key of the InternalAuditPreparation entity
            InternalAuditPreparationPagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdateInternalAuditPreparationDto>, //Used to create/update a InternalAuditPreparation
        IInternalAuditPreparationAppService //implement the IInternalAuditPreparationAppService
    {
        //   Start Permissions
        #region Start Permissions
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditPreparation.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditPreparation.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditPreparation.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditPreparation.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.InternalAuditPreparation.Delete;

        #endregion
        // End Permissions
        //Start Properties and Constructor InternalAuditPreparationAppService
        #region Start Properties and Constructor InternalAuditPreparationAppService
        private readonly IInternalAuditPreparationRepository InternalAuditPreparationRepository;
        private readonly IdentityUserManager User;
        private readonly IFrameworkRepository _FrameworkRepository;
        private readonly IInternalAuditorRepository _internalAuditorRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IInternalAuditRiskRepository _AuditRiskRepository;
        private readonly IRiskAndOpportunityRepository RiskAndOpportunityRepository;

        public InternalAuditPreparationAppService(IdentityUserManager _User, IRiskAndOpportunityRepository riskAndOpportunityRepository, IInternalAuditRiskRepository AuditRiskRepository, IEmployeeRepository EmployeeRepository, IDepartmentRepository DepartmentRepository, IInternalAuditorRepository InternalAuditorRepository, IFrameworkRepository FrameworkRepository, IInternalAuditPreparationRepository _InternalAuditPreparationRepository) : base(_InternalAuditPreparationRepository)
        {
            InternalAuditPreparationRepository = _InternalAuditPreparationRepository;
            User = _User;
            _FrameworkRepository = FrameworkRepository;
            _internalAuditorRepository = InternalAuditorRepository;
            _departmentRepository = DepartmentRepository;
            _employeeRepository = EmployeeRepository;
            _AuditRiskRepository = AuditRiskRepository;
            RiskAndOpportunityRepository = riskAndOpportunityRepository;
        }
        #endregion
        //End Properties and Constructor InternalAuditPreparationAppService
        //Start Methods getbyId and GetListInternalAuditPreparationBy
        #region Start Methods 

        public override async Task<InternalAuditPreparationDto> CreateAsync(CreateUpdateInternalAuditPreparationDto input)
        {
            try
            {
                Random _rdm = new Random();
                input.AuditCode = "AUD" + _rdm.Next(0, 9999).ToString("D4");
                var entity = await MapToEntityAsync(input);
                TryToSetTenantId(entity);
                await Repository.InsertAsync(entity, autoSave: true);

                if (input.Auditors != null && input.Auditors.Count > 0)
                {
                    List<InternalAuditor> ModelList = new List<InternalAuditor>();
                    foreach (var auditor in input.Auditors)
                    {
                        var audtor = new InternalAuditor(entity.Id, auditor.UserId, auditor.DepartmentId, auditor.IsAuditor);
                        ModelList.Add(audtor);
                    }
                    await _internalAuditorRepository.InsertManyAsync(ModelList, autoSave: true);
                }
                if (input.RiskOpportunityIds != null && input.RiskOpportunityIds.Count > 0)
                {
                    List<InternalAuditRisk> AuditRiskList = new List<InternalAuditRisk>();
                    foreach (var RiskId in input.RiskOpportunityIds)
                    {
                        var audRisk = new InternalAuditRisk(RiskId, entity.Id);
                        AuditRiskList.Add(audRisk);
                    }
                    await _AuditRiskRepository.InsertManyAsync(AuditRiskList, autoSave: true);
                }

                var Audit = await GetEntityByIdAsync(entity.Id);

                return await MapToGetOutputDtoAsync(Audit);
            }
            catch (Exception)
            {

                throw;
            }

        }
        /// <summary>
        /// UpdateAsync
        /// </summary>
        /// <param name="id"></param>
        /// <param name="input"></param>
        /// <returns></returns>

        public override async Task<InternalAuditPreparationDto> UpdateAsync(Guid id, CreateUpdateInternalAuditPreparationDto input)
        {
            try
            {
                var entity = await GetEntityByIdAsync(id);

                await MapToEntityAsync(input, entity);

                await Repository.UpdateAsync(entity, autoSave: true);

                if (entity.IsApprove == null)
                {
                    #region [Auditors]
                    if (input.Auditors != null && input.Auditors.Count > 0)
                    {
                        var Auditors = (await _internalAuditorRepository.GetQueryableAsync()).Where(x => x.InternalAuditPreparationId == entity.Id).ToList();
                        foreach (var Auditor in Auditors)
                        {
                            await _internalAuditorRepository.DeleteAsync(Auditor.Id, autoSave: true);
                        }


                        List<InternalAuditor> ModelList = new List<InternalAuditor>();
                        foreach (var auditor in input.Auditors)
                        {
                            var audtor = new InternalAuditor(entity.Id, auditor.UserId, auditor.DepartmentId, auditor.IsAuditor);
                            ModelList.Add(audtor);
                        }
                        await _internalAuditorRepository.InsertManyAsync(ModelList, autoSave: true);

                    }

                    if (input.RiskOpportunityIds != null && input.RiskOpportunityIds.Count > 0)
                    {
                        var AuditRisks = (await _AuditRiskRepository.GetQueryableAsync()).Where(x => x.InternalAuditPreparationId == entity.Id).ToList();
                        foreach (var AuditRisk in AuditRisks)
                        {
                            await _AuditRiskRepository.DeleteAsync(AuditRisk.Id, autoSave: true);
                        }
                        List<InternalAuditRisk> AuditRiskList = new List<InternalAuditRisk>();
                        foreach (var RiskId in input.RiskOpportunityIds)
                        {
                            var audRisk = new InternalAuditRisk(RiskId, entity.Id);
                            AuditRiskList.Add(audRisk);
                        }
                        await _AuditRiskRepository.InsertManyAsync(AuditRiskList, autoSave: true);
                    }

                    #endregion
                }


                var audit = await GetEntityByIdAsync(id);

                return await MapToGetOutputDtoAsync(audit);
            }
            catch (Exception)
            {

                throw;
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public override async Task DeleteAsync(Guid id)
        {
            try
            {
                var entity = await GetEntityByIdAsync(id);

                await Repository.DeleteAsync(entity, autoSave: true);

                #region [Deleted Questions]

                var Auditors = (await _internalAuditorRepository.GetQueryableAsync()).Where(x => x.InternalAuditPreparationId == entity.Id).ToList();
                foreach (var auditor in Auditors)
                {

                    await _internalAuditorRepository.DeleteAsync(auditor.Id, autoSave: true);
                }
                var AuditRisks = (await _AuditRiskRepository.GetQueryableAsync()).Where(x => x.InternalAuditPreparationId == entity.Id).ToList();
                foreach (var AuditRisk in AuditRisks)
                {

                    await _AuditRiskRepository.DeleteAsync(AuditRisk.Id, autoSave: true);
                }

                


            }
            catch (Exception)
            {

                throw;
            }


            #endregion
        }

        /// <summary>
        /// GetListInternalAuditByFilterAsync
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<InternalAuditPreparationDto>> GetListInternalAuditByFilterAsync(InternalAuditPreparationPagedAndSortedResultRequestDto input)
        {
            try
            {

                int totalCount = 0;
                var ListQuestions = (await InternalAuditPreparationRepository.GetQueryableAsync()).Where(x =>
                         ((x.AuditTitleAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) ||
                         (x.AuditTitleEn.Contains(input.Search) || input.Search.IsNullOrEmpty())))
                    .WhereIf(input.DepartmentId != null, e => e.DepartmentId == input.DepartmentId)
                     .WhereIf(input.FrameworkId != null, e => e.FrameworkId == input.FrameworkId)
                     .WhereIf(input.IsApprove != null, e => e.IsApprove == input.IsApprove)
                .WhereIf(input.ApproveBy != null, e => e.ApproveBy == input.ApproveBy)
                .WhereIf(input.approveDate != null, e => e.approveDate == input.approveDate)
                        .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                var Questions = ObjectMapper.Map<List<InternalAuditPreparation>, List<InternalAuditPreparationDto>>(ListQuestions);
                var ListQuestion = (await InternalAuditPreparationRepository.GetQueryableAsync()).ToList();
                totalCount = ListQuestion.Count;
                foreach (var item in Questions)
                {

                    if (item.CreatorId != null)
                    {
                        var getuser = User.GetByIdAsync((Guid)item.CreatorId).Result;
                        item.Creator = ObjectMapper.Map<IdentityUser, IdentityUserDto>(getuser);
                    }
                    if (item.FrameworkId != null)
                    {
                        var Framework = await _FrameworkRepository.FirstOrDefaultAsync(t => t.Id == item.FrameworkId);
                        item.Framework = ObjectMapper.Map<RMG.ComplianceSystem.Frameworks.Framework, FrameworkDto>(Framework);
                    }
                    if (item.DepartmentId != null)
                    {
                        var Department = await _departmentRepository.FirstOrDefaultAsync(t => t.Id == item.DepartmentId);
                        item.Department = ObjectMapper.Map<Department, DepartmentDto>(Department);
                        //  var listAuditDept = _internalAuditorRepository.Where(t=>t.InternalAuditPreparationId==item.Id&&t.DepartmentId==item.DepartmentId).ToList();

                    }

                }
                if (!string.IsNullOrEmpty(input.Sorting))
                {
                    var propertyInfo = typeof(InternalAuditPreparationDto).GetProperty(input.Sorting);
                    Questions.OrderBy(p => propertyInfo.GetValue(p, null));
                }
                return new PagedResultDto<InternalAuditPreparationDto>(
                    totalCount,
                    Questions
                );
            }
            catch (Exception)
            {

                return null;
            }

        }

        /// <summary>
        /// GetInternalAuditByIdAsync
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>

        public async Task<InternalAuditPreparationDto> GetInternalAuditByIdAsync(Guid Id)
        {
            try
            {
                var audit = await InternalAuditPreparationRepository.FirstOrDefaultAsync(t => t.Id == Id);
                var AuditDto = ObjectMapper.Map<InternalAuditPreparation, InternalAuditPreparationDto>(audit);
                if (AuditDto != null)
                {
                    if (AuditDto.DepartmentId != null)
                    {
                        var listAuditDept = (await _internalAuditorRepository.GetQueryableAsync()).Where(t => t.InternalAuditPreparationId == AuditDto.Id && t.DepartmentId == AuditDto.DepartmentId).ToList();
                        if (listAuditDept.Count > 0) AuditDto.AuditorDeptDto = ObjectMapper.Map<List<InternalAuditor>, List<InternalAuditorDto>>(listAuditDept);

                    }
                    var listAudit = (await _internalAuditorRepository.GetQueryableAsync()).Where(t => t.InternalAuditPreparationId == AuditDto.Id && t.IsAuditor == true).ToList();
                    if (listAudit.Count > 0)
                    { AuditDto.AuditorDto = ObjectMapper.Map<List<InternalAuditor>, List<AuditorDto>>(listAudit); }

                    var listAuditRisk = (await _AuditRiskRepository.GetQueryableAsync()).Where(t => t.InternalAuditPreparationId == AuditDto.Id).ToList();
                    if (listAuditRisk.Count > 0)
                    {
                        var ListRiskIds=new List<Guid>();
                        foreach (var item in listAuditRisk)
                        {
                            ListRiskIds.Add(item.RiskOpportunityId);
                        }
                        AuditDto.RiskOpportunityIds = ListRiskIds;
                    }
                }


                return AuditDto;
            }
            catch (Exception)
            {

                return null;
            }

        }
        public async Task<List<EmployeeDto>> GetUsersByDeptIdAsync(Guid DeptId)
        {
            var Users = (await _employeeRepository.GetQueryableAsync()).Where(e => e.DepartmentId == DeptId).ToList();
            var DeptUsers = ObjectMapper.Map<List<Employee>, List<EmployeeDto>>(Users);
            return DeptUsers;
        }
        public async Task<List<RiskAndOpportunityDto>> GetRisksByFrameWorkeIdAsync(Guid FrmId)
        {
            var Risks = (await RiskAndOpportunityRepository.GetQueryableAsync()).Where(e => e.FrameWorkId == FrmId).ToList();
            var RiskDtos = ObjectMapper.Map<List<RiskOpportunity>, List<RiskAndOpportunityDto>>(Risks);
            return RiskDtos;
        }

        #endregion


    }
}
