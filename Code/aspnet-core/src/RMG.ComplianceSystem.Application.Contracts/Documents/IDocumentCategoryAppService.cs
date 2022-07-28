using RMG.ComplianceSystem.Documents.Dtos;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Documents
{
    public interface IDocumentCategoryAppService :
        ICrudAppService< 
            DocumentCategoryDto, 
            Guid,
            DocCategoryPagedAndSortedResultRequestDto,
            CreateUpdateDocumentCategoryDto>
    {
        Task<ListResultDto<DocumentCategoryDto>> getDocumentCategories(DocCategoryPagedAndSortedResultRequestDto input);
    }
}