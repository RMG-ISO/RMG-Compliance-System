using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Users;
using Microsoft.AspNetCore.Authorization;
using RMG.ComplianceSystem.Attachments.Dtos;
using RMG.ComplianceSystem.Documents;
using RMG.ComplianceSystem.Documents.Dtos;
using RMG.ComplianceSystem.Permissions;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Identity;
using Volo.Abp.ObjectMapping;
using RMG.ComplianceSystem.Attachments;

namespace RMG.ComplianceSystem.Policies
{
    // [Authorize(ComplianceSystemPermissions.Document.Default)]
    public class DocumentAppService :
        CrudAppService<
            Document, //The Document entity
            DocumentDto, //Used to show Documents
            Guid, //Primary key of the Document entity
            DocPagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdateDocumentDto>, //Used to create/update a Document
        IDocumentAppService //implement the IDocumentAppService
    {


        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.Document.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.Document.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.Document.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.Document.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.Document.Delete;
        private readonly IDocumentRepository Documentrepository;
        private readonly IdentityUserManager User;
        private readonly IAttachmentRepository _attachmentRepository;
        private readonly IDocumentCategoryRepository _DocCateRepository;

        public DocumentAppService(IdentityUserManager _User, IDocumentCategoryRepository DocCateRepository, IAttachmentRepository attachmentRepository, IDocumentRepository _repository) : base(_repository)
        {
            Documentrepository = _repository;
            User = _User;
            _attachmentRepository = attachmentRepository;
            _DocCateRepository = DocCateRepository;
        }

        public override async Task<DocumentDto> GetAsync(Guid id)
        {

            //Prepare a query to join Documents and authors
            var query = from Document in Repository
                        where Document.Id == id
                        select new { Document };

            //Execute the query and get the Document with author
            var queryResult = await AsyncExecuter.FirstOrDefaultAsync(query);
            if (queryResult == null)
            {
                throw new EntityNotFoundException(typeof(Document), id);
            }

            var DocumentDto = ObjectMapper.Map<Document, DocumentDto>(queryResult.Document);
            return DocumentDto;
        }



        public async Task<PagedResultDto<FullDocumentDto>> GetListDocumentByCategoryAsync(DocPagedAndSortedResultRequestDto input)
        {
            var DocCate = _DocCateRepository.GetAsync(input.CategoryId).Result;
            var DocCateDto = ObjectMapper.Map<DocumentCategory, DocumentCategoryDto>(DocCate);
            //Prepare a query to join Documents 
            var Documents = Documentrepository.Where(x => x.CategoryId == input.CategoryId && 
            (x.TitleAr.Contains(input.Search) || input.Search.IsNullOrEmpty()) || (x.TitleAr.Contains(input.Search) || input.Search.IsNullOrEmpty()))
             .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
           List<FullDocumentDto> DocumentDtos = new List<FullDocumentDto>();
            FullDocumentDto fullDocumentDto= new FullDocumentDto();
            fullDocumentDto.DocumentCategoryDto = DocCateDto;
            List<DocumentDto> document=new List<DocumentDto>();
            foreach (var item in Documents)
            {
                var getAttachment = _attachmentRepository.GetAsync(item.AttachmentId).Result;
                var Attachment = ObjectMapper.Map<RMG.ComplianceSystem.Attachments.Attachment, AttachmentDto>(getAttachment);
                IdentityUserDto UserDto = new IdentityUserDto();
                if (item.CreatorId != null)
                {
                    var getuser = User.GetByIdAsync((Guid)item.CreatorId).Result;
                    UserDto = ObjectMapper.Map<IdentityUser, IdentityUserDto>(getuser);
                }
                else { UserDto = null; }
              
                DocumentDto docdto = new DocumentDto
                {
                    Attachment = Attachment,
                    AttachmentId = item.AttachmentId,
                    TitleAr = item.TitleAr,
                    TitleEn = item.TitleEn,
                    CreationTime = item.CreationTime,
                    CategoryId = item.CategoryId,
                    UserDto = UserDto

                };
                document.Add(docdto);
                
            }
            fullDocumentDto.documentDtos= document;
            DocumentDtos.Add(fullDocumentDto);
            //Get the total count with Repository query
            var totalCount = document.Count;

            return new PagedResultDto<FullDocumentDto>(
                totalCount,
                DocumentDtos
            );
        }

    }
}
