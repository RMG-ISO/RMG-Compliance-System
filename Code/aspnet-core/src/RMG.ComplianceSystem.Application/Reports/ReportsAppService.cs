using RMG.ComplianceSystem.Assessments;
using RMG.ComplianceSystem.Domains;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RMG.ComplianceSystem.Reports
{
    public class ReportsAppService : ComplianceSystemAppService
    {
        private readonly IDomainRepository _domainRepository;
        public ReportsAppService(IDomainRepository domainRepository)
        {
            _domainRepository = domainRepository;
        }



        public  async Task<List<ComplianceLevelTableDto>> GetControllersByComplianceLevel([Required] Guid frameworkId)
        {
            var result = new List<ComplianceLevelTableDto>();

            var domains = (await _domainRepository.GetQueryableAsync()).Where(x => x.FrameworkId == frameworkId);
            // if framework doesn't have any main domain
            if (!domains.Any())
            {
               return  result;
            }

            // if main domains doesn't have at least Controller
            if (!domains.Any(x => x.Controls.Count > 0))
            {
                return domains.Select(x => new ComplianceLevelTableDto { DomainName = x.NameAr }).ToList();
            }

            var controllers = domains.SelectMany(x => x.Controls);

            //if at least one sub controller exist
            if (controllers.Any() && controllers.Any(x => x.Children.Count > 0))
            {
                controllers = controllers.SelectMany(x => x.Children);
            }

            var mainDomainNamesDict = domains.ToDictionary(x => x.NameAr, x => controllers.SelectMany(x => x.Assessments).ToList());


            foreach (var item in mainDomainNamesDict)
            {
                result.Add(new ComplianceLevelTableDto
                {
                    DomainName = item.Key,
                    NotImplemented = item.Value.Count(x => (int)x.ComplianceLevel == 0 || !x.ComplianceLevel.HasValue),
                    Intial = item.Value.Count(x => x.ComplianceLevel == ComplianceLevelType.ComplianceLevel1),
                    Defined = item.Value.Count(x => x.ComplianceLevel == ComplianceLevelType.ComplianceLevel2),
                    Effective = item.Value.Count(x => x.ComplianceLevel == ComplianceLevelType.ComplianceLevel3),
                    Measurable = item.Value.Count(x => x.ComplianceLevel == ComplianceLevelType.ComplianceLevel4),
                    Mature = item.Value.Count(x => x.ComplianceLevel != ComplianceLevelType.ComplianceLevel5)
                });
            }
            return result;
        }

        public async Task<List<CompliancePhaseTableDto>> GetControllersByPhase([Required] Guid frameworkId)
        {
            var domains = (await _domainRepository.GetQueryableAsync()).Where(x => x.FrameworkId == frameworkId);
            var result = new List<CompliancePhaseTableDto>();
            // if framework doesn't have any main domain
            if (!domains.Any())
            {
                return result;
            }

            // if main domains doesn't have at least Controller
            if (!domains.Any(x => x.Controls.Count > 0))
            {
                return domains.Select(x => new CompliancePhaseTableDto { DomainName = x.NameAr }).ToList();
            }

            var controllers = domains.SelectMany(x => x.Controls);

            //if at least one sub controller exist
            if (controllers.Any() && controllers.Any(x => x.Children.Count > 0))
            {
                controllers = controllers.SelectMany(x => x.Children);
            }

            var mainDomainNamesDict = domains.ToDictionary(x => x.NameAr, x => controllers.SelectMany(x => x.Assessments).ToList());

            foreach (var item in mainDomainNamesDict)
            {
                result.Add(new CompliancePhaseTableDto
                {
                    DomainName = item.Key,
                    DocumentedNo = item.Value.Count(x => x.Documented == DocumentedType.NotDocumented),
                    DocumentedPartially = item.Value.Count(x => x.Documented == DocumentedType.PartialDocumented),
                    DocumentedYes = item.Value.Count(x => x.Documented == DocumentedType.Documented),
                    EffectiveNo = item.Value.Count(x => x.Effective == EffectiveType.NotEffective),
                    EffectivePartially = item.Value.Count(x => x.Effective == EffectiveType.PartialEffective),
                    EffectiveYes = item.Value.Count(x => x.Effective == EffectiveType.Effective),
                    ImplementedNo = item.Value.Count(x => x.Implemented == ImplementedType.NotImplemented),
                    ImplementedPartially = item.Value.Count(x => x.Implemented == ImplementedType.PartialImplemented),
                    ImplementedYes = item.Value.Count(x => x.Implemented == ImplementedType.Implemented),
                });
            }
            return result;
        }

        
    }
}