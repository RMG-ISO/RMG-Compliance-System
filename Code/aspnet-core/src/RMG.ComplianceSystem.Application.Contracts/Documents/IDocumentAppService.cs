using RMG.ComplianceSystem.Documents.Dtos;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Documents
{
    
    public interface IDocumentAppService :
     ICrudAppService< //Defines CRUD methods
         DocumentDto, //Used to show books
         Guid, //Primary key of the book entity
         DocPagedAndSortedResultRequestDto, //Used for paging/sorting
         CreateUpdateDocumentDto> //Used to create/update a book
    {
        Task<PagedResultDto<DocumentDto>> GetListDocumentByCategoryAsync(DocPagedAndSortedResultRequestDto input);
        Task<DocumentDto> GetByIdAsync(Guid Id);
    }
}