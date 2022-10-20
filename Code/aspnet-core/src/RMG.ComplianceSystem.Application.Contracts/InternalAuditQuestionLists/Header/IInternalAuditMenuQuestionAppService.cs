using RMG.ComplianceSystem.InternalAuditQuestionLists.Header.Dto;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.InternalAuditMenuQuestions
{
    public interface IInternalAuditMenuQuestionAppService :
     ICrudAppService< //Defines CRUD methods
         InternalAuditMenuQuestionDto, //Used to show books
         Guid, //Primary key of the book entity
         InternalAuditMenuQuestionPagedAndSortedResultRequestDto, //Used for paging/sorting
         CreateUpdateInternalAuditMenuQuestionDto> //Used to create/update a book
    {
        Task<PagedResultDto<InternalAuditMenuQuestionDto>> GetListQuestionByFilterAsync(InternalAuditMenuQuestionPagedAndSortedResultRequestDto input);
    }

    public interface IInternalAuditQuestionListManager
    {
        Task<bool> CanUpdate(Guid questionListId);
    }
}
