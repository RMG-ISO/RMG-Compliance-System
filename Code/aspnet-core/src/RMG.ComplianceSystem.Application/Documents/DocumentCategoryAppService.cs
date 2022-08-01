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

        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.Document.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.Document.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.Document.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.Document.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.Document.Delete;

        private readonly IDocumentCategoryRepository DocumentCateRepository;

        public DocumentCategoryAppService(IDocumentCategoryRepository _DocumentCateRepository) : base(_DocumentCateRepository)
        {
            DocumentCateRepository = _DocumentCateRepository;
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
