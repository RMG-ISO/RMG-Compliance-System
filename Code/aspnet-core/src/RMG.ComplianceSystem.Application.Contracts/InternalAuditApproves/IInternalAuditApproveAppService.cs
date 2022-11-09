using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.InternalAuditApproves
{
    
    public interface IInternalAuditApproveAppService :
     ICrudAppService< //Defines CRUD methods
         InternalAuditApproveDto, //Used to show books
         Guid, //Primary key of the book entity
         InternalAuditApprovePagedAndSortedResultRequestDto, //Used for paging/sorting
         CreateUpdateInternalAuditApproveDto> //Used to create/update a book
    {
        Task<PagedResultDto<InternalAuditApproveDto>> GetListAuditAppoveByFilterAsync(InternalAuditApprovePagedAndSortedResultRequestDto input);
    }
}