using RMG.ComplianceSystem.InternalAuditQuestionLists.Footer.Dto;
using RMG.ComplianceSystem.InternalAuditQuestionLists.Header.Dto;
using RMG.ComplianceSystem.InternalAuditQuestions;
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
        Task<PagedResultDto<InternalAuditQuestionDto>> GetListQuestionByIdAsync(InternalAuditQuestionListPagedAndSortedResultRequestDto input);
        }

    public interface IInternalAuditQuestionListManager
    {
        Task<bool> CanUpdate(Guid questionListId);
    }
}
