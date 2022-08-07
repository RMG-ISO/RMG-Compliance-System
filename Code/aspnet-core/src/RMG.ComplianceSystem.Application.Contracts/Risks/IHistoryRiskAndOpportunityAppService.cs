using RMG.ComplianceSystem.Risks.Dtos;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Risks
{
    
    public interface IHistoryRiskAndOpportunityAppService :
     ICrudAppService< //Defines CRUD methods
         HistoryRiskAndOpportunityDto, //Used to show books
         Guid, //Primary key of the book entity
         HistoryRiskOpportunityPagedAndSortedResultRequestDto, //Used for paging/sorting
         CreateUpdateHistoryRiskAndOpportunityDto> //Used to create/update a book
    {
        Task<PagedResultDto<HistoryRiskAndOpportunityDto>> GetListHistoryByFilterAsync(HistoryRiskOpportunityPagedAndSortedResultRequestDto input);
    }
}