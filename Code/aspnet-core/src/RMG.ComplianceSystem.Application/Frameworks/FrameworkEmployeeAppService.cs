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
using RMG.ComplianceSystem.Framework;

namespace RMG.ComplianceSystem.Frameworks
{
    public class FrameworkEmployeeAppService : CrudAppService<FrameworkEmployee, FrameworkEmployeeDto, Guid, FrameworkEmployeePagedAndSortedResultRequestDto, CreateUpdateFrameworkEmployeeDto, CreateUpdateFrameworkEmployeeDto>,
        IFrameworkEmployeeAppService
    {
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.Framework.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.Framework.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.Framework.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.Framework.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.Framework.Delete;


        private readonly IAssessmentRepository _assessmentRepository;
        private readonly IDomainRepository _domainRepository;
        private readonly IControlRepository _controlRepository;
        private readonly IFrameworkEmployeeRepository _repository;

        public FrameworkEmployeeAppService(IFrameworkEmployeeRepository repository,
            IDomainRepository domainRepository,
        IControlRepository controlRepository,
            IAssessmentRepository assessmentRepository) : base(repository)
        {
            _repository = repository;
            _assessmentRepository = assessmentRepository;
            _domainRepository = domainRepository;
            _controlRepository = controlRepository;
        }


     

        protected override Task<FrameworkEmployee> GetEntityByIdAsync(Guid id)
        {
            return Repository.GetAsync(id);
        }

        [Authorize]
        public async Task<ListResultDto<FrameworkEmployeeDto>> GetFrameworkEmployeeListLookupAsync()
        {
            var data = await Repository.GetListAsync();
            return new ListResultDto<FrameworkEmployeeDto>(ObjectMapper.Map<List<FrameworkEmployee>, List<FrameworkEmployeeDto>>(data));
        }

     

      
    }
}
      