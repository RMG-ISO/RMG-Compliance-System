using RMG.ComplianceSystem.Risks.Dtos;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Risks
{
    
    public interface IRiskAndOpportunityAppService :
     ICrudAppService< //Defines CRUD methods
         RiskAndOpportunityDto, //Used to show books
         Guid, //Primary key of the book entity
         RiskOpportunityPagedAndSortedResultRequestDto, //Used for paging/sorting
         CreateUpdateRiskAndOpportunityDto> //Used to create/update a book
    {
        Task<PagedResultDto<RiskAndOpportunityDto>> GetListRiskByFilterAsync(RiskOpportunityPagedAndSortedResultRequestDto input);
    }
}