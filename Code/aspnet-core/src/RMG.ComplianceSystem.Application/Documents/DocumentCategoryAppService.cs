using System;
using RMG.ComplianceSystem.Permissions;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using RMG.ComplianceSystem.Documents;
using RMG.ComplianceSystem.Documents.Dtos;

namespace RMG.ComplianceSystem.DocumentCategorys
{
    public class DocumentCategoryAppService : 
        CrudAppService<DocumentCategory,
            DocumentCategoryDto,
            Guid, 
            DocCategoryPagedAndSortedResultRequestDto, 
            CreateUpdateDocumentCategoryDto>,
        IDocumentCategoryAppService
    {


        private readonly IDocumentCategoryRepository DocumentCateRepository;

        public DocumentCategoryAppService(IDocumentCategoryRepository _DocumentCateRepository) : base(_DocumentCateRepository)
        {
            DocumentCateRepository = _DocumentCateRepository;
            GetPolicyName = ComplianceSystemPermissions.DocumentCategory.Default;
            GetListPolicyName = ComplianceSystemPermissions.DocumentCategory.Default;
            CreatePolicyName = ComplianceSystemPermissions.DocumentCategory.Create;
            UpdatePolicyName = ComplianceSystemPermissions.DocumentCategory.Update;
            DeletePolicyName = ComplianceSystemPermissions.DocumentCategory.Delete;
        }


        public async Task<ListResultDto<DocumentCategoryDto>> getDocumentCategories(DocCategoryPagedAndSortedResultRequestDto input)
        {
            var DocumentCats = DocumentCateRepository.Where(x => (x.NameAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) || (x.NameEn.Contains(input.Search) || input.Search.IsNullOrEmpty()))
             .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
            var DocCateDtos = ObjectMapper.Map<List<DocumentCategory>, List<DocumentCategoryDto>>(DocumentCats);
            var totalCount = DocCateDtos.Count;

            return new PagedResultDto<DocumentCategoryDto>(
                totalCount,
                DocCateDtos
            );
        }





    }
}
