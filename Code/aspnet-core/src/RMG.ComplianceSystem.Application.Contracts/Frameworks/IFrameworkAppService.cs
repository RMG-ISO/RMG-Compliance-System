using System;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Frameworks.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Frameworks
{
    public interface IFrameworkAppService :
        ICrudAppService< 
            FrameworkDto, 
            Guid,
            FrameworkPagedAndSortedResultRequestDto,
            CreateUpdateFrameworkDto,
            CreateUpdateFrameworkDto>
    {
        Task<ListResultDto<FrameworkDto>> GetFrameworkListLookupAsync();

        Task SendToReviewer(Guid id);
        Task SendToOwner(Guid id);
        Task ReturnToCreator(Guid id, RejectFrameworkDto input);
        Task Approve(Guid id);

        Task StartSelfAssessment(Guid id);

        Task Activate(Guid id);
        Task Deactivate(Guid id);
        Task SendForInternalAssessment(Guid id);
        Task ApproveCompliance(Guid id);
    }
}