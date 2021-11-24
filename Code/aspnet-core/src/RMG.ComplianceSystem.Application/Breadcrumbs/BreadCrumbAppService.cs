using Microsoft.AspNetCore.Authorization;
using RMG.ComplianceSystem.Breadcrumbs.Dtos;
using RMG.ComplianceSystem.Controls;
using RMG.ComplianceSystem.Domains;
using RMG.ComplianceSystem.Frameworks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace RMG.ComplianceSystem.Breadcrumbs
{
    [Authorize]
    public class BreadCrumbAppService : ComplianceSystemAppService, IBreadCrumbAppService
    {
        private readonly IFrameworkRepository _frameworkRepository;
        private readonly IDomainRepository _domainRepository;
        private readonly IControlRepository _controlRepository;

        public BreadCrumbAppService(
            IFrameworkRepository frameworkRepository,
            IDomainRepository domainRepository,
            IControlRepository controlRepository
            )
        {
            _frameworkRepository = frameworkRepository;
            _domainRepository = domainRepository;
            _controlRepository = controlRepository;
        }
        public async Task<BreadCrumbSettingsDto> GetBreadCrumbSettings(GetBreadCrumbSettingsDto input)
        {
            Framework framework = null;
            Domain domain = null;
            Domain subDomain = null;
            Control control = null;
            Control subControl = null;


            switch (input.Type)
            {
                case BreadCrumbSettingsType.Framework:
                    {
                        framework = _frameworkRepository.SingleOrDefault(t => t.Id == input.Id);
                    }
                    break;
                case BreadCrumbSettingsType.MainDomain:
                    {
                        domain = _domainRepository.SingleOrDefault(t => t.Id == input.Id);
                        if (domain != null)
                        {
                            framework = _frameworkRepository.SingleOrDefault(t => t.Id == domain.FrameworkId);
                        }
                    }
                    break;
                case BreadCrumbSettingsType.SubDomain:
                    {
                        subDomain = _domainRepository.SingleOrDefault(t => t.Id == input.Id);
                        if (subDomain != null)
                        {
                            domain = _domainRepository.SingleOrDefault(t => t.Id == subDomain.ParentId);

                            if (domain != null)
                                framework = _frameworkRepository.SingleOrDefault(t => t.Id == domain.FrameworkId);
                        }
                    }
                    break;
                case BreadCrumbSettingsType.MainControl:
                    {
                        control = _controlRepository.SingleOrDefault(t => t.Id == input.Id);
                        if (control != null)
                        {
                            subDomain = _domainRepository.SingleOrDefault(t => t.Id == control.DomainId);

                            if (subDomain != null)
                                domain = _domainRepository.SingleOrDefault(t => t.Id == subDomain.ParentId);

                            if (domain != null)
                                framework = _frameworkRepository.SingleOrDefault(t => t.Id == domain.FrameworkId);
                        }
                    }
                    break;
                case BreadCrumbSettingsType.SubControl:
                    {
                        subControl = _controlRepository.SingleOrDefault(t => t.Id == input.Id);

                        if (subControl != null)
                        {
                            control = _controlRepository.SingleOrDefault(t => t.Id == subControl.ParentId);

                            if (control != null)
                                subDomain = _domainRepository.SingleOrDefault(t => t.Id == control.DomainId);

                            if (subDomain != null)
                                domain = _domainRepository.SingleOrDefault(t => t.Id == subDomain.ParentId);

                            if (domain != null)
                                framework = _frameworkRepository.SingleOrDefault(t => t.Id == domain.FrameworkId);
                        }
                    }
                    break;
                default:
                    break;

            }

            return new BreadCrumbSettingsDto
            {
                FrameworkName = Thread.CurrentThread.CurrentUICulture.Name.Contains("ar", StringComparison.OrdinalIgnoreCase) ? framework?.NameAr : framework?.NameEn,
                FrameworkUrl = framework != null ? "framework/list" : null,
                DomainName = Thread.CurrentThread.CurrentUICulture.Name.Contains("ar", StringComparison.OrdinalIgnoreCase) ? domain?.NameAr : domain?.NameEn,
                DomainUrl = framework != null && domain != null ? $"/framework/{framework.Id}/main-domains/list" : null,
                SubDomainName = Thread.CurrentThread.CurrentUICulture.Name.Contains("ar", StringComparison.OrdinalIgnoreCase) ? subDomain?.NameAr : subDomain?.NameEn,
                SubDomainUrl = framework != null && domain != null && subDomain != null ? $"framework/{framework.Id}/main-domains/{domain.Id}/sub-domains" : null,
                ControlName = Thread.CurrentThread.CurrentUICulture.Name.Contains("ar", StringComparison.OrdinalIgnoreCase) ? control?.NameAr : control?.NameEn,
                ControlUrl = framework != null && domain != null && subDomain != null && control != null ? $"framework/{framework.Id}/main-domains/{domain.Id}/sub-domains/{subDomain.Id}/main-controls/list" : null,
                SubControlName = Thread.CurrentThread.CurrentUICulture.Name.Contains("ar", StringComparison.OrdinalIgnoreCase) ? subControl?.NameAr : subControl?.NameEn,
                SubControlUrl = framework != null && domain != null && subDomain != null && control != null && subControl != null ? $"framework/{framework.Id}/main-domains/{domain.Id}/sub-domains/{subDomain.Id}/main-controls/{control.Id}/sub-controls" : null


            };
        }
    }
}
