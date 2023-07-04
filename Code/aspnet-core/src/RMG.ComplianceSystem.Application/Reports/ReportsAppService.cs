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

            var controllers = domains.Select(x => Tuple.Create(x.NameAr,x.Controls.ToList()));

            //if at least one sub controller exist
            if (domains.Any(x => x.Controls.Count > 0) && domains.SelectMany(x => x.Controls.SelectMany(y => y.Children)).Any())
            {
                controllers = controllers.Select(x => Tuple.Create(x.Item1,x.Item2.SelectMany(y => y.Children).ToList()));
            }

            var mainDomains = domains.Where(x => x.ParentId == null);
            var child = mainDomains.SelectMany(x => x.Children);
            var mainDomainsDict = new Dictionary<Domain, IList<Control>>();
            bool subController = false;
            foreach (var domain in mainDomains)
            {
                var subDomains = _domainRepository.Where(d => d.ParentId == domain.Id).Select(d => d.Id).ToList();
                var controls = _controlRepository.Where(c => subDomains.Contains(c.DomainId)).ToList();
                if (controls.Any(x => x.Children != null))
                {
                    subController = true;
                    controls = controls.Where(x => x.Children != null).SelectMany(x => x.Children).ToList();
                }
                mainDomainsDict.Add(domain, controls);
            }

                //mainDomains.ToDictionary(mainDomain => mainDomain, mainDomain => mainDomain.Children.SelectMany(domain => domain.Controls.SelectMany(controls => controls.Children)) ?? mainDomain.Children.SelectMany(x => x.Controls));
            return new List<CompliancePriorityTableDto>
            {
                new CompliancePriorityTableDto () { Priority = PriorityType.Priority1 , Domains = mainDomainsDict.Select(x => new ComplianceControllerDto { ComplianceCount = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority1) , ControllersCount = x.Value.Count() , DomainName = x.Key.NameAr , DocumentedNo = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority1,null,DocumentedType.NotDocumented) , DocumentedPartially = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority1, null , DocumentedType.PartialDocumented) , DocumentedYes = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority1 , null, DocumentedType.Documented) , EffectiveNo = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority1 , EffectiveType.NotEffective) , EffectivePartially = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority1,EffectiveType.PartialEffective) , EffectiveYes = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority1 , EffectiveType.Effective), ImplementedNo =  GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority1 , null, null , ImplementedType.NotImplemented) , ImplementedPartially  = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority1 , null, null , ImplementedType.PartialImplemented) ,  ImplementedYes = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority1 , null, null , ImplementedType.Implemented)}).ToList() },
                new CompliancePriorityTableDto () { Priority = PriorityType.Priority1 , Domains = mainDomainsDict.Select(x => new ComplianceControllerDto { ComplianceCount = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority2) , ControllersCount = x.Value.Count() , DomainName = x.Key.NameAr , DocumentedNo = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority2,null,DocumentedType.NotDocumented) , DocumentedPartially = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority2, null , DocumentedType.PartialDocumented) , DocumentedYes = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority2 , null, DocumentedType.Documented) , EffectiveNo = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority2 , EffectiveType.NotEffective) , EffectivePartially = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority2,EffectiveType.PartialEffective) , EffectiveYes = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority2 , EffectiveType.Effective), ImplementedNo =  GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority2 , null, null , ImplementedType.NotImplemented) , ImplementedPartially  = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority2 , null, null , ImplementedType.PartialImplemented) ,  ImplementedYes = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority2 , null, null , ImplementedType.Implemented)}).ToList()},
                new CompliancePriorityTableDto () { Priority = PriorityType.Priority1 , Domains = mainDomainsDict.Select(x => new ComplianceControllerDto { ComplianceCount = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority3) , ControllersCount = x.Value.Count() , DomainName = x.Key.NameAr , DocumentedNo = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority3,null,DocumentedType.NotDocumented) , DocumentedPartially = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority3, null , DocumentedType.PartialDocumented) , DocumentedYes = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority3 , null, DocumentedType.Documented) , EffectiveNo = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority3 , EffectiveType.NotEffective) , EffectivePartially = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority3,EffectiveType.PartialEffective) , EffectiveYes = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority3 , EffectiveType.Effective), ImplementedNo =  GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority3 , null, null , ImplementedType.NotImplemented) , ImplementedPartially  = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority3 , null, null , ImplementedType.PartialImplemented) ,  ImplementedYes = GetComplianceControlCountByDomainId(x.Key.Id, subController, PriorityType.Priority3 , null, null , ImplementedType.Implemented)}).ToList()},
            };
        }

        private int GetComplianceControlCountByDomainId(Guid domainId, bool subController , PriorityType priority, EffectiveType? effective =null, DocumentedType? documented =null, ImplementedType? implemented= null)
        {
            var subDomains = _domainRepository.Where(d => d.ParentId == domainId).Select(d => d.Id).ToList();
            var controls = _controlRepository.Where(c => subDomains.Contains(c.DomainId)).ToList();
            if (subController)
            {
                controls = controls.Where(x => x.Children != null).SelectMany(x => x.Children).ToList();
            }

            return _assessmentRepository.Where(x => x.Priority == priority)
                                        .WhereIf(effective.HasValue, x => x.Effective == effective.Value)
                                        .WhereIf(documented.HasValue, x => x.Documented == documented.Value)
                                        .WhereIf(implemented.HasValue, x => x.Implemented == implemented.Value)
                                        .Count(a => controls.Select(x => x.Id).Contains(a.ControlId));
        }

        public List<ControlsCountByPriorityTableDto> GetControlsCountByPriority([Required]Guid frameworkId)
        {
            var domainsIds = _domainRepository.Where(x => x.FrameworkId == frameworkId).Select(x => x.Id);
            var controls = _controlRepository.Where(c => domainsIds.Contains(c.DomainId) && c.ParentId != null);
            var result = new List<ControlsCountByPriorityTableDto>();

            #region Priority1
            int controlsCountPriorityOne = _assessmentRepository.Where(x => x.Priority == PriorityType.Priority1).Count(a => controls.Select(x => x.Id).Contains(a.ControlId));
            int documentedCountPriorityOne = _assessmentRepository.Where(x => x.Priority == PriorityType.Priority1 && x.Documented == DocumentedType.Documented).Count(a => controls.Select(x => x.Id).Contains(a.ControlId));
            int effectiveCountPriorityOne = _assessmentRepository.Where(x => x.Priority == PriorityType.Priority1 && x.Effective == EffectiveType.Effective).Count(a => controls.Select(x => x.Id).Contains(a.ControlId));
            int implementedCountPriorityOne = _assessmentRepository.Where(x => x.Priority == PriorityType.Priority1 && x.Implemented == ImplementedType.Implemented).Count(a => controls.Select(x => x.Id).Contains(a.ControlId));
            #endregion

            #region Priority2
            int controlsCountPriorityTwo = _assessmentRepository.Where(x => x.Priority == PriorityType.Priority2).Count(a => controls.Select(x => x.Id).Contains(a.ControlId));
            int documentedCountPriorityTwo = _assessmentRepository.Where(x => x.Priority == PriorityType.Priority2 && x.Documented == DocumentedType.Documented).Count(a => controls.Select(x => x.Id).Contains(a.ControlId));
            int effectiveCountPriorityTwo= _assessmentRepository.Where(x => x.Priority == PriorityType.Priority2 && x.Effective == EffectiveType.Effective).Count(a => controls.Select(x => x.Id).Contains(a.ControlId));
            int implementedCountPriorityTwo = _assessmentRepository.Where(x => x.Priority == PriorityType.Priority2 && x.Implemented == ImplementedType.Implemented).Count(a => controls.Select(x => x.Id).Contains(a.ControlId));
            #endregion

            #region Priority3 
            int controlsCountPriorityThree = _assessmentRepository.Where(x => x.Priority == PriorityType.Priority3).Count(a => controls.Select(x => x.Id).Contains(a.ControlId));
            int documentedCountPriorityThree = _assessmentRepository.Where(x => x.Priority == PriorityType.Priority3 && x.Documented == DocumentedType.Documented).Count(a => controls.Select(x => x.Id).Contains(a.ControlId));
            int effectiveCountPriorityThree = _assessmentRepository.Where(x => x.Priority == PriorityType.Priority3 && x.Effective == EffectiveType.Effective).Count(a => controls.Select(x => x.Id).Contains(a.ControlId));
            int implementedCountPriorityThree = _assessmentRepository.Where(x => x.Priority == PriorityType.Priority3 && x.Implemented == ImplementedType.Implemented).Count(a => controls.Select(x => x.Id).Contains(a.ControlId));
            #endregion
            return new List<ControlsCountByPriorityTableDto>
            {
                new ControlsCountByPriorityTableDto () 
                { 
                  Priority = PriorityType.Priority1 , 
                  ControlsCount = controlsCountPriorityOne, 
                  DocumentedCount =  documentedCountPriorityOne,
                  DocumentedPercentage = controlsCountPriorityOne !=0 ? ( documentedCountPriorityOne / controlsCountPriorityOne ) * 100 : 0,
                  EffectiveCount = effectiveCountPriorityOne,
                  ImplementedCount = implementedCountPriorityOne,
                  ImplementedPercentage = controlsCountPriorityOne != 0 ?(implementedCountPriorityOne / controlsCountPriorityOne) * 100 : 0,
                  EffectivePercentage  = controlsCountPriorityOne != 0 ?(effectiveCountPriorityOne / controlsCountPriorityOne) * 100 : 0,
                  PercentageOfTotal = ( controlsCountPriorityOne / controls.Count() ) * 100,
                },
                new ControlsCountByPriorityTableDto ()
                {
                    Priority = PriorityType .Priority2 ,
                    ControlsCount = controlsCountPriorityTwo,
                    DocumentedCount = documentedCountPriorityTwo,
                    EffectiveCount= effectiveCountPriorityTwo,
                    ImplementedCount = implementedCountPriorityTwo,
                    DocumentedPercentage = controlsCountPriorityTwo != 0 ? (documentedCountPriorityTwo / controlsCountPriorityTwo ) * 100 : 0,
                    EffectivePercentage = controlsCountPriorityTwo != 0 ? (effectiveCountPriorityTwo / controlsCountPriorityTwo) *100 : 0,
                    ImplementedPercentage = controlsCountPriorityTwo !=0 ? (implementedCountPriorityTwo / controlsCountPriorityTwo ) * 100 : 0,
                    PercentageOfTotal = controlsCountPriorityTwo != 0 ? (controlsCountPriorityOne / controls.Count() ) * 100 : 0,
                },
                new ControlsCountByPriorityTableDto ()
                {
                    Priority = PriorityType .Priority3 ,
                    ControlsCount = controlsCountPriorityThree,
                    DocumentedCount = documentedCountPriorityThree,
                    EffectiveCount= effectiveCountPriorityThree,
                    ImplementedCount = implementedCountPriorityThree,
                    DocumentedPercentage = controlsCountPriorityThree != 0 ?  (documentedCountPriorityThree / controlsCountPriorityThree ) * 100 : 0,
                    EffectivePercentage = controlsCountPriorityThree != 0 ?  (effectiveCountPriorityThree / controlsCountPriorityThree) *100: 0,
                    ImplementedPercentage = controlsCountPriorityThree != 0 ? (implementedCountPriorityThree / controlsCountPriorityThree ) * 100 : 0,
                    PercentageOfTotal = controlsCountPriorityThree != 0 ? (controlsCountPriorityThree / controls.Count() ) * 100 :0,
                }
            };
        }

        
    }
}