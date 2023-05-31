using System;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Controls.Dtos;
using RMG.ComplianceSystem.Domains.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Domains
{
    public interface IDomainAppService :
        ICrudAppService< 
            DomainDto, 
            Guid,
            DomainPagedAndSortedResultRequestDto,
            CreateUpdateDomainDto,
            CreateUpdateDomainDto>
    {
        Task StartInternalAssessment(Guid id);
        Task EndInternalAssessment(Guid id);
    }
}