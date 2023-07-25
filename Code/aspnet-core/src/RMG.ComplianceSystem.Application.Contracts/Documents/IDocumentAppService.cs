using RMG.ComplianceSystem.Documents.Dtos;
using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Documents
{
    
    public interface IDocumentAppService :
     ICrudAppService< //Defines CRUD methods
         DocumentDto, //Used to show books
         Guid, //Primary key of the book entity
         DocumentGetListInputDto, //Used for paging/sorting
         CreateDocumentDto> //Used to create/update a book
    {
        Task<ListResultDto<NameId<Guid>>> GetAllCategories();
    }
}