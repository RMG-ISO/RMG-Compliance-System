using RMG.ComplianceSystem.Risks.Dtos;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.StaticData
{
    
    public interface IStaticDataAppService :
     ICrudAppService< //Defines CRUD methods
         StaticDataDto, //Used to show books
         Guid, //Primary key of the book entity
         StaticDataPagedAndSortedResultRequestDto, //Used for paging/sorting
         CreateUpdateStaticDataDto> //Used to create/update a book
    {
        Task<PagedResultDto<StaticDataDto>> GetListByFilterAsync(StaticDataPagedAndSortedResultRequestDto input);
    }
}