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
using Volo.Abp.Identity;

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

        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.DocumentCategory.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.DocumentCategory.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.DocumentCategory.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.DocumentCategory.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.DocumentCategory.Delete;

        private readonly IDocumentCategoryRepository DocumentCateRepository;
        private readonly IdentityUserManager User;

        public DocumentCategoryAppService(IdentityUserManager _User,IDocumentCategoryRepository _DocumentCateRepository) : base(_DocumentCateRepository)
        {
            DocumentCateRepository = _DocumentCateRepository;
            User= _User;    
        }


        public async Task<ListResultDto<DocumentCategoryDto>> getDocumentCategories(DocCategoryPagedAndSortedResultRequestDto input)
        {
            int totalCount=0;  
            var DocumentCats = DocumentCateRepository.Where(x => x.IsDeleted == false && ((x.NameAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) || (x.NameEn.Contains(input.Search) || input.Search.IsNullOrEmpty())))
             .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
            var DocCateDtos = ObjectMapper.Map<List<DocumentCategory>, List<DocumentCategoryDto>>(DocumentCats);
            var categories=new List<DocumentCategoryDto>();

            var Categories = DocumentCateRepository.ToList();
            totalCount = DocCateDtos.Count;

            if (!string.IsNullOrEmpty(input.Sorting))
            {
                var propertyInfo = typeof(DocumentCategoryDto).GetProperty(input.Sorting);
                DocCateDtos.OrderBy(p => propertyInfo.GetValue(p, null));
            }
            foreach (var item in DocCateDtos)
            {
                var cate = new DocumentCategoryDto();
                cate = item;
                if (cate.CreatorId != null)
                {
                    var getuser = User.GetByIdAsync((Guid)cate.CreatorId).Result;
                    cate.Creator = ObjectMapper.Map<IdentityUser, IdentityUserDto>(getuser);
                }
                categories.Add(cate);   
            }
          
            // var totalCount = categories.Count;

            return new PagedResultDto<DocumentCategoryDto>(
                totalCount,
                categories
            );
        }





    }
}
