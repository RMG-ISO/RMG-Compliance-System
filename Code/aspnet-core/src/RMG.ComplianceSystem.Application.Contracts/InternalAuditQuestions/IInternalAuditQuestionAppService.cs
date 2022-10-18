using RMG.ComplianceSystem.InternalAuditQuestions.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.InternalAuditQuestions
{
    public interface IInternalAuditQuestionAppService :
     ICrudAppService< //Defines CRUD methods
         InternalAuditQuestionDto, //Used to show books
         Guid, //Primary key of the book entity
         InternalAuditQuestionPagedAndSortedResultRequestDto, //Used for paging/sorting
         CreateUpdateInternalAuditQuestionDto> //Used to create/update a book
    {
        Task<PagedResultDto<InternalAuditQuestionDto>> GetListQuestionByFilterAsync(InternalAuditQuestionPagedAndSortedResultRequestDto input);
    }
}
