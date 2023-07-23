using RMG.ComplianceSystem.Documents.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Documents
{
    
    public interface IDocumentSectionAppService :
     ICrudAppService< //Defines CRUD methods
         DocumentSectionDto, //Used to show books
         Guid, //Primary key of the book entity
         DocumentSectionGetListInputDto, //Used for paging/sorting
         CreateUpdateDocumentSectionDto> //Used to create/update a book
    {
        Task ChangeOrders(Guid id, List<Guid> sections);
    }
}