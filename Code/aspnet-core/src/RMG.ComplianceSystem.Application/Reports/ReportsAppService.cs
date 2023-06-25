using DocumentFormat.OpenXml.Office2010.Excel;
using MimeKit.Encodings;
using RMG.ComplianceSystem.Assessments;
using RMG.ComplianceSystem.Assessments.Dtos;
using RMG.ComplianceSystem.Controls;
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
        private readonly IAssessmentRepository _assessmentRepository;
        private readonly IControlRepository _controlRepository;
        public ReportsAppService(IDomainRepository domainRepository, IAssessmentRepository assesmentRepository, IControlRepository controlRepository)
        {
            _domainRepository = domainRepository;
            _assessmentRepository = assesmentRepository;
            _controlRepository = controlRepository;
        }



        public  List<ComplianceLevelTableDto> GetControllersByComplianceLevel([Required] Guid frameworkId)
        {
            var result = new List<ComplianceLevelTableDto>();

            var domains = _domainRepository.Where(x => x.FrameworkId == frameworkId);
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

        public List<CompliancePhaseTableDto> GetControllersByPhase([Required] Guid frameworkId)
        {
            var domains = _domainRepository.Where(x => x.FrameworkId == frameworkId);
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

        public List<CompliancePriorityTableDto> GetControllerByPriorityLevel([Required] Guid frameworkId)
        {
            var domains = _domainRepository.Where(x => x.FrameworkId == frameworkId);
            var result = new List<CompliancePriorityTableDto>();
            // if framework doesn't have any main domain
            if (!domains.Any())
            {
                return result;
            }
            
            // if main domains doesn't have at least Controller
            if (!domains.Any(x => x.Chi.Count > 0))
            {
                return new List<CompliancePriorityTableDto>
                {
                    new CompliancePriorityTableDto () { Priority = PriorityType.Priority1 },
                    new CompliancePriorityTableDto () { Priority = PriorityType.Priority2 },
                    new CompliancePriorityTableDto () { Priority = PriorityType.Priority3 },
                };
            };

            var controllers = domains.Select(x => Tuple.Create(x.NameAr,x.Controls.ToList()));

            //if at least one sub controller exist
            if (controllers.Any() && controllers.Any(x => x.Item2.SelectMany(y => y.Children).Count() > 0))
            {
                controllers = controllers.Select(x => Tuple.Create(x.Item1,x.Item2.SelectMany(y => y.Children).ToList()));
            }


          
            var mainDomainsDict = domains.ToDictionary(mainDomain => mainDomain, mainDomain => mainDomain.Children.SelectMany(domain => domain.Controls.SelectMany(controls => controls.Children)) ?? mainDomain.Children.SelectMany(x => x.Controls));
            return new List<CompliancePriorityTableDto>
            {
                new CompliancePriorityTableDto () { Priority = PriorityType.Priority1 , Domains = mainDomainsDict.Select(x => new ComplianceControllerDto { ComplianceCount = GetComplianceControlCountByDomainId(x.Key.Id) , ControllersCount = x.Value.Count() , DomainName = x.Key.NameAr}).ToList() },
                new CompliancePriorityTableDto () { Priority = PriorityType.Priority2 ,  Domains = mainDomainsDict.Select(x => new ComplianceControllerDto { ComplianceCount = GetComplianceControlCountByDomainId(x.Key.Id) , ControllersCount = x.Value.Count() , DomainName = x.Key.NameAr}).ToList()s },
                new CompliancePriorityTableDto () { Priority = PriorityType.Priority3 ,  Domains = mainDomainsDict.Select(x => new ComplianceControllerDto { ComplianceCount = GetComplianceControlCountByDomainId(x.Key.Id) , ControllersCount = x.Value.Count() , DomainName = x.Key.NameAr}).ToList()},
            };
        }

        private int GetComplianceControlCountByDomainId(Guid domainId)
        {
            var subDomains = _domainRepository.Where(d => d.ParentId == domainId).Select(d => d.Id).ToList();
            var controlsIds = _controlRepository.Where(c => subDomains.Contains(c.DomainId)).Select(c => c.Id).ToList();
            return _assessmentRepository.Count(a => controlsIds.Contains(a.ControlId));
        }

        
    }
}