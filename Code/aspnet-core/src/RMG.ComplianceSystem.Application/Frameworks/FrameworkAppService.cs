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
                                if (control.Children != null)
                                    foreach (var ctrl in control.Children)
                                    {
                                        var Ctrol = new SubControlsDto();
                                        Ctrol.subControl = ObjectMapper.Map<Control, ControlDto>(ctrl);
                                        var assesment = _assessmentRepository.Where(u => u.ControlId == ctrl.Id).FirstOrDefault();
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


      
    }
}
      