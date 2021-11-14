using System;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.Attachments.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Content;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace RMG.ComplianceSystem.Attachments
{
    public class AttachmentAppService : ComplianceSystemAppService, IAttachmentAppService
    {


        private readonly IAttachmentRepository _attachmentRepository;
        private readonly IAttachmentFileRepository _attachmentFileRepository;

        public AttachmentAppService(IAttachmentRepository attachmentRepository, IAttachmentFileRepository attachmentFileRepository)
        {
            _attachmentRepository = attachmentRepository;
            _attachmentFileRepository = attachmentFileRepository;
        }

        //protected override Task<System.Linq.IQueryable<Attachment>> CreateFilteredQueryAsync(PagedAndSortedResultRequestDto input)
        //{
        //    return Repository.WithDetailsAsync();
        //}

        //protected override Task<Attachment> GetEntityByIdAsync(Guid id)
        //{
        //    return Repository.GetAsync(id);
        //}

        //[RemoteService(false)]
        //public override Task<AttachmentDto> CreateAsync(CreateUpdateAttachmentDto input)
        //{
        //    return base.CreateAsync(input);
        //}

        //[RemoteService(false)]
        //public override Task<AttachmentDto> UpdateAsync(Guid id, CreateUpdateAttachmentDto input)
        //{
        //    return base.UpdateAsync(id, input);
        //}

        //[RemoteService(false)]
        //public override Task DeleteAsync(Guid id)
        //{
        //    return base.DeleteAsync(id);
        //}

        //[RemoteService(false)]
        //public override Task<AttachmentDto> GetAsync(Guid id)
        //{
        //    return base.GetAsync(id);
        //}

        //[RemoteService(false)]
        //public override Task<PagedResultDto<AttachmentDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        //{
        //    return base.GetListAsync(input);
        //}

        [Route("/api/app/attachment/upload-files")]
        public async Task<Guid> UploadFiles(Guid? attachmentId, bool? isMultiple, int? maxFileSize, string fileExtentions, List<IFormFile> files)
        {
            return GuidGenerator.Create();
        }

        public async Task DeleteFile(Guid attachmentId, Guid fileId)
        {

        }

        public async Task<AttachmentDto> GetAttachmentWithFile(Guid attachmentId)
        {
            return null;
        }

        public async Task<IRemoteStreamContent> GetDownloadAttachmentFiles(Guid attachmentId)
        {
            return null;
        }

        public async Task<IRemoteStreamContent> GetDownloadFile(Guid fileId)
        {
            return null;
        }



        //public override async Task<PagedResultDto<AttachmentDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        //{
        //    await CheckGetListPolicyAsync();

        //    var query = await CreateFilteredQueryAsync(input);

        //    var totalCount = await AsyncExecuter.CountAsync(query);

        //    query = ApplySorting(query, input);
        //    query = ApplyPaging(query, input);

        //    var entities = await AsyncExecuter.ToListAsync(query);
        //    var entityDtos = await MapToGetListOutputDtosAsync(entities);

        //    return new PagedResultDto<AttachmentDto>(
        //        totalCount,
        //        entityDtos
        //    );
        //}
    }
}
