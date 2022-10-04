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

        public FrameworkAppService(IFrameworkRepository repository,
            IDomainRepository domainRepository,
        IControlRepository controlRepository,
            IAssessmentRepository assessmentRepository) : base(repository)
        {
            _repository = repository;
            _assessmentRepository = assessmentRepository;
            _domainRepository = domainRepository;
            _controlRepository = controlRepository;
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


        public async Task<List<ComplainceDto>> GetFrameWorkData()
        {
            var listComplaince = new List<ComplainceDto>();
            var Complaince = new ComplainceDto();
            Complaince.TotalApplicable = _assessmentRepository.Where(t => t.Applicable == ApplicableType.Applicable).Count();
            Complaince.TotalNotApplicable = _assessmentRepository.Where(t => t.Applicable == ApplicableType.NotApplicable).Count();
            var framworks = _repository.ToList();
            var ListFramework = new List<FrameworkData>();
            
            foreach (var item in framworks)
            {
                var FrameworkDt = new FrameworkData();
                var DomainsDta = new DomainsDta();
                FrameworkDt.FrameworkDto = ObjectMapper.Map<Framework, FrameworkDto>(item);
                var domainsWithChild = _domainRepository.Where(c => c.FrameworkId == item.Id).ToList();
                foreach (var domains in domainsWithChild)
                {
                    var ListDomains = new List<DomainsDta>();
                    if (domains.Children != null)
                        foreach (var domain in domains.Children)
                        {
                            var domainDto = ObjectMapper.Map<Domain, DomainDto>(domain);
                            DomainsDta.subdomain = domainDto;
                            var ControlsDto = new List<ControlsDto>();
                            var controlsWithChild = _controlRepository.Where(e => e.DomainId == domain.Id).ToList();
                            foreach (var control in controlsWithChild)
                            {
                                var Ctrol = new ControlsDto();
                                if (control.Children != null)
                                    foreach (var ctrl in control.Children)
                                    {
                                        Ctrol.subControl = ObjectMapper.Map<Control, ControlDto>(ctrl);
                                        Ctrol.AssessmentDto = ObjectMapper.Map<Assessment, AssessmentDto>(_assessmentRepository.Where(u => u.ControlId == ctrl.Id).FirstOrDefault());
                                        if (Ctrol.AssessmentDto != null)
                                        {
                                            if (Ctrol.AssessmentDto.Applicable == ApplicableType.Applicable)
                                                FrameworkDt.Applicable += 1;
                                            if (Ctrol.AssessmentDto.Applicable == ApplicableType.Applicable)
                                                FrameworkDt.NotApplicable += 1;
                                        }
                                    }
                                ControlsDto.Add(Ctrol);
                            }
                            DomainsDta.ChildrenControls = ControlsDto;
                        }
                    ListDomains.Add(DomainsDta);
                    FrameworkDt.DomaindDta = ListDomains;
                    
                }
                ListFramework.Add(FrameworkDt);

            };
            Complaince.FrameworkData = ListFramework;
            listComplaince.Add(Complaince);

            return listComplaince;
        }
    }
}
