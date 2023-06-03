using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Attachments.Dtos;
using RMG.ComplianceSystem.Documents;
using RMG.ComplianceSystem.Documents.Dtos;
using RMG.ComplianceSystem.Permissions;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;
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
        //   Start Permissions
        #region Start Permissions
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.Document.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.Document.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.Document.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.Document.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.Document.Delete;
        protected  string DownLoadPolicyName { get; set; } = ComplianceSystemPermissions.Document.DownLoad;
        #endregion
        // End Permissions
        //Start Properties and Constructor DocumentAppService
        #region Start Properties and Constructor DocumentAppService
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
        #endregion
        //End Properties and Constructor DocumentAppService
        //Start Methods getbyId and GetListDocumentByCategory
        #region Start Methods getbyId and GetListDocumentByCategory
        public async Task<PagedResultDto<DocumentDto>> GetListDocumentByCategoryAsync(DocPagedAndSortedResultRequestDto input)
        {
            List<DocumentDto> Documents = new List<DocumentDto>();
            
            int totalCount = 0;
            if (input.CategoryId!=null)
            {
                //get Document By CategoryId and Filters and Pagination
                var ListDocuments = (await Documentrepository.GetQueryableAsync()).Where(x => x.IsDeleted == false && x.CategoryId == (Guid)input.CategoryId &&x.IsDeleted==false&&
                ((x.TitleEn.Contains(input.Search) || input.Search.IsNullOrEmpty()) || (x.TitleAr.Contains(input.Search) || input.Search.IsNullOrEmpty())))
                 .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                 Documents = ObjectMapper.Map<List<Document>, List<DocumentDto>>(ListDocuments);
                var ListDocument = (await Documentrepository.GetQueryableAsync()).Where(x => x.CategoryId == (Guid)input.CategoryId).ToList();
                totalCount = ListDocument.Count;   
            }
            else
            {
                //get Document By CategoryId and Filters and Pagination
              var  ListDoc = (await Documentrepository.GetQueryableAsync()).Where(x => x.IsDeleted == false &&
                ((x.TitleEn.Contains(input.Search) || input.Search.IsNullOrEmpty()) || (x.TitleAr.Contains(input.Search) || input.Search.IsNullOrEmpty())))
                 .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();

                Documents = ObjectMapper.Map<List<Document>, List<DocumentDto>>(ListDoc);
                var ListDocument = (await Documentrepository.GetQueryableAsync()).ToList();
                totalCount = ListDocument.Count;
            }
            if (!string.IsNullOrEmpty(input.Sorting))
            {
                var propertyInfo = typeof(DocumentDto).GetProperty(input.Sorting);
                Documents.OrderBy(p => propertyInfo.GetValue(p, null));
            }
            // instance of List of FullDocumentDto
            List<DocumentDto> DocumentDtos = new List<DocumentDto>();
            // instance of  List<DocumentDto>
            List<DocumentDto> document=new List<DocumentDto>();
            // loop in Documents and get attacments by every Document
            foreach (var item in Documents)
            {
                // get attachmentR
                var getAttachment = _attachmentRepository.GetAsync(item.AttachmentId).Result;
                // Mapping Attachment to AttachmentDto
                var Attachment = ObjectMapper.Map<RMG.ComplianceSystem.Attachments.Attachment, AttachmentDto>(getAttachment);
                // instance of  creatorUserDto
                IdentityUserDto creatorUserDto = new IdentityUserDto();
                // instance of  UpdateUserDto
                IdentityUserDto UpdateUserDto = new IdentityUserDto();
                // check CreatorId not equal null 
                if (item.CreatorId != null)
                {
                    // get user by CreatorId
                    var getuser = User.GetByIdAsync((Guid)item.CreatorId).Result;
                    // Mapping IdentityUser to IdentityUserDto
                    creatorUserDto = ObjectMapper.Map<IdentityUser, IdentityUserDto>(getuser);
                }
                else {
                    // in case CreatorId  equal null 
                    creatorUserDto = null;
                    // in case updateId  equal null 
                    UpdateUserDto = null;
                }
                string UpdateUserName = string.Empty;
                if (item.LastModifierId != null)
                {   // get user by LastModifierId
                    var getUdateuser = User.GetByIdAsync((Guid)item.LastModifierId).Result;
                    // Mapping IdentityUser to IdentityUserDto
                    UpdateUserDto = ObjectMapper.Map<IdentityUser, IdentityUserDto>(getUdateuser);
                    UpdateUserName = UpdateUserDto.UserName;
                }
                else
                {
                    // in case LastModifierId  equal null 
                    UpdateUserDto = null;
                    UpdateUserName = "";
                }
                // get object from DocumentDto and Set Data
                DocumentDto docdto = new DocumentDto
                {
                    // DocumentID 
                    Id= item.Id,    
                    Attachment = Attachment,
                    AttachmentId = item.AttachmentId,
                    TitleAr = item.TitleAr,
                    TitleEn = item.TitleEn,
                    CreationTime = item.CreationTime,
                    CategoryId = item.CategoryId,
                    //CategoryNameAr = DocCateDto.NameAr,
                    //CategoryNameEn = DocCateDto.NameEn,
                    CreatorUserName = creatorUserDto.UserName,
                    UpdateUserName = UpdateUserName,

                };
                // Add data of DocumentDto in List of document
                document.Add(docdto);
                
            }
            //Get the total count with document
          //  var totalCount = document.Count;
            // return DocumentDtos and totalCount
            return new PagedResultDto<DocumentDto>(
                totalCount,
                document
            );
        }


        // get Document and Attachments by DocumentId
        public async Task<DocumentDto> GetByIdAsync(Guid Id)
        {
            // get Document 
            var Doc = Documentrepository.GetAsync(Id).Result;
            // Mapping Document to DocumentDto
            var document = ObjectMapper.Map<Document, DocumentDto>(Doc);
            // get Attachments 
            var getAttachment = await _attachmentRepository.GetAsync(document.AttachmentId);
            // Mapping Attachment to AttachmentDto
            var Attachment = ObjectMapper.Map<RMG.ComplianceSystem.Attachments.Attachment, AttachmentDto>(getAttachment);
            //Set Attachment in document.Attachment
            document.Attachment= Attachment;
            // return document include attachments , attachments Files and Audits
            return document;
        }
        #endregion


    }
}
