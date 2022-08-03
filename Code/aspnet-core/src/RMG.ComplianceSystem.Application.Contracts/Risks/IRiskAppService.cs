using RMG.ComplianceSystem.Risks.Dtos;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Risks
{
    
    public interface IRiskAppService :
     ICrudAppService< //Defines CRUD methods
         RiskDto, //Used to show books
         Guid, //Primary key of the book entity
         RiskPagedAndSortedResultRequestDto, //Used for paging/sorting
         CreateUpdateRiskDto> //Used to create/update a book
    {
        Task<PagedResultDto<RiskDto>> GetListRiskByCategoryAsync(RiskPagedAndSortedResultRequestDto input);
        Task<RiskDto> GetByIdAsync(Guid Id);
    }
}