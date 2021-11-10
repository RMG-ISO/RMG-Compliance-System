using System;
using RMG.ComplianceSystem.Domains.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Domains
{
    public interface IDomainAppService :
        ICrudAppService< 
            DomainDto, 
            Guid, 
            PagedAndSortedResultRequestDto,
            CreateUpdateDomainDto,
            CreateUpdateDomainDto>
    {

    }
}