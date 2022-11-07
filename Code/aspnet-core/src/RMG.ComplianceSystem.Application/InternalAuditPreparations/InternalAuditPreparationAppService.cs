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

        public InternalAuditPreparationAppService(IdentityUserManager _User, IDepartmentRepository DepartmentRepository, IInternalAuditorRepository InternalAuditorRepository, IFrameworkRepository FrameworkRepository, IInternalAuditPreparationRepository _InternalAuditPreparationRepository) : base(_InternalAuditPreparationRepository)
        {
            InternalAuditPreparationRepository = _InternalAuditPreparationRepository;
            User = _User;
            _FrameworkRepository = FrameworkRepository;
            _internalAuditorRepository = InternalAuditorRepository;
            _departmentRepository = DepartmentRepository;
        }
        #endregion
        //End Properties and Constructor InternalAuditPreparationAppService
        //Start Methods getbyId and GetListInternalAuditPreparationBy
        #region Start Methods 

        public override async Task<InternalAuditPreparationDto> CreateAsync(CreateUpdateInternalAuditPreparationDto input)
        {
            try
            {
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

                #region [Auditors]
                if (input.Auditors != null && input.Auditors.Count > 0)
                {
                    var Auditors = _internalAuditorRepository.Where(x => x.InternalAuditPreparationId == entity.Id).ToList();
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


                #endregion



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

                var Auditors = _internalAuditorRepository.Where(x => x.InternalAuditPreparationId == entity.Id).ToList();
                foreach (var auditor in Auditors)
                {

                    await _internalAuditorRepository.DeleteAsync(auditor.Id, autoSave: true);
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
                var ListQuestions = InternalAuditPreparationRepository.Where(x =>
                         ((x.AuditTitleAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) ||
                         (x.AuditTitleEn.Contains(input.Search) || input.Search.IsNullOrEmpty())))
                    .WhereIf(input.DepartmentId!=null,e=>e.DepartmentId== input.DepartmentId)
                     .WhereIf(input.FrameworkId != null, e => e.FrameworkId == input.FrameworkId)
                        .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                var Questions = ObjectMapper.Map<List<InternalAuditPreparation>, List<InternalAuditPreparationDto>>(ListQuestions);
                var ListQuestion = InternalAuditPreparationRepository.ToList();
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
                        var Framework = _FrameworkRepository.FirstOrDefault(t => t.Id == item.FrameworkId);
                        item.Framework = ObjectMapper.Map<Framework, FrameworkDto>(Framework);
                    }
                    if (item.DepartmentId != null)
                    {
                        var Department = _departmentRepository.FirstOrDefault(t => t.Id == item.DepartmentId);
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
                var audit = InternalAuditPreparationRepository.FirstOrDefault(t => t.Id == Id);
                var AuditDto = ObjectMapper.Map<InternalAuditPreparation, InternalAuditPreparationDto>(audit);
                if (AuditDto != null)
                {
                    if (AuditDto.DepartmentId != null)
                    {
                        var listAuditDept = _internalAuditorRepository.Where(t => t.InternalAuditPreparationId == AuditDto.Id && t.DepartmentId == AuditDto.DepartmentId).ToList();
                        if (listAuditDept.Count > 0) AuditDto.AuditorDeptDto = ObjectMapper.Map<List<InternalAuditor>, List<InternalAuditorDto>>(listAuditDept);

                    }
                    var listAudit = _internalAuditorRepository.Where(t => t.InternalAuditPreparationId == AuditDto.Id && t.IsAuditor == true).ToList();
                    if (listAudit.Count > 0)
                        AuditDto.AuditorDto = ObjectMapper.Map<List<InternalAuditor>, List<AuditorDto>>(listAudit);
                }

                return AuditDto;
            }
            catch (Exception)
            {

                return null;
            }
           
        }


        #endregion


    }
}
