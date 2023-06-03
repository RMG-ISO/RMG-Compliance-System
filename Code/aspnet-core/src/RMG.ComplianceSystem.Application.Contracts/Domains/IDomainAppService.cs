using System;
using System.Collections.Generic;
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
        Task DeleteMany(List<Guid> ids);
        Task StartReview(Guid id);
        Task ApproveCompliance(Guid id);
        Task ReturnToResponsible(Guid id);
        Task SendToOwner(Guid id);
    }
}