using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.BlobStoring;
using Volo.Abp.Domain.Services;

namespace RMG.ComplianceSystem.Attachments
{
    public class AttachmentManager : DomainService
    {
        private readonly IAttachmentRepository _attachmentRepository;
        private readonly IAttachmentFileRepository _attachmentFileRepository;
        private readonly IBlobContainer<AttachmentFileContainer> _fileContainer;

        public AttachmentManager(
            IAttachmentRepository attachmentRepository,
            IAttachmentFileRepository attachmentFileRepository,
            IBlobContainer<AttachmentFileContainer> fileContainer
            )
        {
            _attachmentRepository = attachmentRepository;
            _attachmentFileRepository = attachmentFileRepository;
            _fileContainer = fileContainer;
        }

        public async Task<Attachment> UploadAndUpdateAttachment(Guid? attachmentId, bool? isMultiple, int? maxFileSize, string fileExtentions, List<IFormFile> files)
        {
            var attachment = (await _attachmentRepository.WithDetailsAsync()).SingleOrDefault(t => t.Id == attachmentId.Value);

            if (isMultiple.HasValue && isMultiple != attachment.IsMultiple)
                attachment.ChangeIsMultiple(isMultiple.Value);

            if (maxFileSize.HasValue && maxFileSize != attachment.MaxFileSize)
                attachment.ChangeMaxFileSize(maxFileSize.Value);

            if (!fileExtentions.IsNullOrEmpty() && fileExtentions != attachment.FileExtentions)
                attachment.ChangeFileExtentions(fileExtentions);

            files.ForEach(file =>
            {
                var ext = MimeTypes.MimeTypeMap.GetExtension(file.ContentType);
                var attachmentFile = new AttachmentFile(GuidGenerator.Create(), GuidGenerator.Create() + ext, file.Length, file.FileName, ext, attachment.Id);
                attachment.AddAttachmentFile(attachmentFile);
                SaveFile(file, attachmentFile);
            });

            return attachment;
        }

        public async Task<Attachment> UploadAndCreateAttachment(Guid? attachmentId, bool? isMultiple, int? maxFileSize, string fileExtentions, List<IFormFile> files)
        {
            var attachment = new Attachment(GuidGenerator.Create());
            if (isMultiple.HasValue)
                attachment.ChangeIsMultiple(isMultiple.Value);

            if (maxFileSize.HasValue)
                attachment.ChangeMaxFileSize(maxFileSize.Value);

            if (!fileExtentions.IsNullOrEmpty())
                attachment.ChangeFileExtentions(fileExtentions);

            files.ForEach(file =>
            {
                var ext = MimeTypes.MimeTypeMap.GetExtension(file.ContentType);
                var attachmentFile = new AttachmentFile(GuidGenerator.Create(), GuidGenerator.Create() + ext, file.Length, file.FileName, ext, attachment.Id);
                attachment.AddAttachmentFile(attachmentFile);
                SaveFile(file, attachmentFile);
            });

            return attachment;
        }

        public AttachmentFile DeleteFile(Guid attachmentId, Guid fileId)
        {
            return _attachmentFileRepository.SingleOrDefault(t => t.Id == fileId && t.AttachmentId == attachmentId);
        }

        private void SaveFile(IFormFile file, AttachmentFile attachmentFile)
        {
            using (var stream = new MemoryStream())
            {
                file.CopyTo(stream);
                _fileContainer.SaveAsync(attachmentFile.Name, stream).Wait();
            }
        }
    }
}
