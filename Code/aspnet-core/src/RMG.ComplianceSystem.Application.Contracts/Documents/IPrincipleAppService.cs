using RMG.ComplianceSystem.Documents.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Documents
{
    
    public interface IPrincipleAppService :
     ICrudAppService< //Defines CRUD methods
         PrincipleDto, //Used to show books
         Guid, //Primary key of the book entity
         PrincipleGetListInputDto, //Used for paging/sorting
         CreateUpdatePrincipleDto> //Used to create/update a book
    {
    }
}