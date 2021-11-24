using System;
using RMG.ComplianceSystem.Attachments.Dtos;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Content;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace RMG.ComplianceSystem.Attachments
{
    [Authorize]
    public class AttachmentAppService : ComplianceSystemAppService, IAttachmentAppService
    {


        private readonly IAttachmentRepository _attachmentRepository;
        private readonly IAttachmentFileRepository _attachmentFileRepository;
        private readonly AttachmentManager _attachmentManager;

        public AttachmentAppService(
            IAttachmentRepository attachmentRepository,
            IAttachmentFileRepository attachmentFileRepository,
            AttachmentManager attachmentManager
            )
        {
            _attachmentRepository = attachmentRepository;
            _attachmentFileRepository = attachmentFileRepository;
            _attachmentManager = attachmentManager;
        }


        [Route("/api/app/attachment/upload-files")]
        public async Task<Guid> UploadFiles(Guid? attachmentId, bool? isMultiple, int? maxFileSize, string fileExtentions, List<IFormFile> files)
        {
            Attachment attachment;
            if (attachmentId.HasValue)
            {
                attachment = await _attachmentManager.UploadAndUpdateAttachment(attachmentId, isMultiple, maxFileSize, fileExtentions, files);
                await _attachmentRepository.UpdateAsync(attachment, autoSave: true);
            }
            else
            {
                attachment = await _attachmentManager.UploadAndCreateAttachment(attachmentId, isMultiple, maxFileSize, fileExtentions, files);
                await _attachmentRepository.InsertAsync(attachment, autoSave: true);
            }
            return attachment.Id;
        }


        public async Task DeleteFile(Guid attachmentId, Guid fileId)
        {
            var attachmentFile = _attachmentManager.DeleteFile(attachmentId, fileId);
            if (attachmentFile != null)
            {
                await _attachmentFileRepository.DeleteAsync(attachmentFile, autoSave: true);
            }
            else
            {
                throw new UserFriendlyException(L["AttachmentFileNotFoundException"]);
            }
        }

        public async Task<AttachmentDto> GetAttachmentWithFile(Guid attachmentId)
        {
            var attachment = await _attachmentRepository.GetAsync(attachmentId);
            return ObjectMapper.Map<Attachment, AttachmentDto>(attachment);
        }

        public async Task<IRemoteStreamContent> GetDownloadAttachmentFiles(Guid attachmentId)
        {
            return await _attachmentManager.DownloadAttachmentFilesAsZip(attachmentId);
        }

        public async Task<IRemoteStreamContent> GetDownloadFile(Guid fileId)
        {
            return await _attachmentManager.DownloadFile(fileId);
        }

    }
}
