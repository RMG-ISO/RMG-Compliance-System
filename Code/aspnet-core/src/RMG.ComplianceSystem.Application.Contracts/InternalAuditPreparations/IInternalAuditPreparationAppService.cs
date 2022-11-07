using RMG.ComplianceSystem.InternalAuditPreparation.Dto;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.InternalAuditPreparation
{
    
    public interface IInternalAuditPreparationAppService :
     ICrudAppService< //Defines CRUD methods
         InternalAuditPreparationDto, //Used to show books
         Guid, //Primary key of the book entity
         InternalAuditPreparationPagedAndSortedResultRequestDto, //Used for paging/sorting
         CreateUpdateInternalAuditPreparationDto> //Used to create/update a book
    {
        Task<PagedResultDto<InternalAuditPreparationDto>> GetListInternalAuditByFilterAsync(InternalAuditPreparationPagedAndSortedResultRequestDto input);
    }
}