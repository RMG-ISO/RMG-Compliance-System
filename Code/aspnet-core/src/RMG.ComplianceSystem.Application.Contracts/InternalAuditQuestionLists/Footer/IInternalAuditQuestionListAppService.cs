using RMG.ComplianceSystem.InternalAuditQuestionLists.Footer.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.InternalAuditQuestionLists
{
    public interface IInternalAuditQuestionListAppService :
     ICrudAppService< //Defines CRUD methods
         InternalAuditQuestionListDto, //Used to show books
         Guid, //Primary key of the book entity
         InternalAuditQuestionListPagedAndSortedResultRequestDto, //Used for paging/sorting
         CreateUpdateInternalAuditQuestionListDto> //Used to create/update a book
    {
        Task<PagedResultDto<InternalAuditQuestionListDto>> GetListQuestionByFilterAsync(InternalAuditQuestionListPagedAndSortedResultRequestDto input);
    }
}
