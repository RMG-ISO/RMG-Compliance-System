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
using Volo.Abp;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace RMG.ComplianceSystem.Policies
{
    //[Authorize(ComplianceSystemPermissions.DocumentSection.Default)]
    public class DocumentSectionAppService :
        CrudAppService<
            DocumentSection, //The DocumentSection entity
            DocumentSectionDto, //Used to show DocumentSections
            Guid, //Primary key of the DocumentSection entity
            DocumentSectionGetListInputDto, //Used for paging/sorting
            CreateUpdateDocumentSectionDto>, //Used to create/update a DocumentSection
        IDocumentSectionAppService //implement the IDocumentSectionAppService
    {
        #region Permissions
        //protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.DocumentSection.Default;
        //protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.DocumentSection.Default;
        //protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.DocumentSection.Create;
        //protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.DocumentSection.Update;
        //protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.DocumentSection.Delete;
        //protected  string DownLoadPolicyName { get; set; } = ComplianceSystemPermissions.DocumentSection.DownLoad;
        #endregion

        private readonly IdentityUserManager User;
        private readonly IAttachmentRepository _attachmentRepository;
        private readonly IPolicyRepository _documentRepository;

        public DocumentSectionAppService(
            IdentityUserManager _User, 
            IAttachmentRepository attachmentRepository, 
            IRepository<DocumentSection, Guid> repository,
            IPolicyRepository documentRepository
            ) : base(repository)
        {
            User = _User;
            _attachmentRepository = attachmentRepository;
            _documentRepository = documentRepository;
        }

        public override async Task<DocumentSectionDto> CreateAsync(CreateUpdateDocumentSectionDto input)
        {
            await CheckCreatePolicyAsync();
            await ValidateCreateUpdateAsync(input);
            var entity = await MapToEntityAsync(input);
            entity.Status = DocumentSectionStatus.Draft;
            entity.Order = (await Repository.CountAsync(s => s.DocumentId == input.DocumentId)) + 1;
            await Repository.InsertAsync(entity, true);
            return await MapToGetOutputDtoAsync(entity);
        }

        public override async Task<DocumentSectionDto> UpdateAsync(Guid id, CreateUpdateDocumentSectionDto input)
        {
            await ValidateCreateUpdateAsync(input);
            return await base.UpdateAsync(id, input); 
        }

        protected override async Task<IQueryable<DocumentSection>> CreateFilteredQueryAsync(DocumentSectionGetListInputDto input)
        {
            var query = await base.CreateFilteredQueryAsync(input);
            query = query.WhereIf(input.DocumentId.HasValue, x => x.DocumentId ==  input.DocumentId);
            return query;
        }

        [HttpPut]
        public async Task ChangeOrders(Guid id, List<Guid> sections)
        {
            int count = 1;
            await _documentRepository.GetAsync(id, false);
            foreach (var item in sections)
            {
                var section = await Repository.GetAsync(item, false);
                section.Order = count++;
                await Repository.UpdateAsync(section);
            }
        }

        private async Task ValidateCreateUpdateAsync(CreateUpdateDocumentSectionDto input)
        {
            await _documentRepository.GetAsync(input.DocumentId);
        }

    }
}
