using System;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Attachments.Dtos;
using RMG.ComplianceSystem.Policies.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.policies
{
    
    public interface IPolicyAppService :
     ICrudAppService< //Defines CRUD methods
         PolicyDto, //Used to show books
         Guid, //Primary key of the book entity
         PagedAndSortedResultRequestDto, //Used for paging/sorting
         CreateUpdatePolicyDto> //Used to create/update a book
    {
       // Task<ListResultDto<AttachmentDto>> GetAttachmentAsync();

    }
}