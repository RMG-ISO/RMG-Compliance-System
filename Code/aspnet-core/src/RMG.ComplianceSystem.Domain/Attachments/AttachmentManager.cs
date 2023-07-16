using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;
using RMG.ComplianceSystem.Localization;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.BlobStoring;
using Volo.Abp.Content;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;

namespace RMG.ComplianceSystem.Attachments
{
    public class AttachmentManager : DomainService
    {
        private readonly IAttachmentRepository _attachmentRepository;
        private readonly IAttachmentFileRepository _attachmentFileRepository;
        private readonly IBlobContainer<AttachmentFileContainer> _fileContainer;
        private readonly IStringLocalizer<ComplianceSystemResource> _localizer;

        public AttachmentManager(
            IAttachmentRepository attachmentRepository,
            IAttachmentFileRepository attachmentFileRepository,
            IBlobContainer<AttachmentFileContainer> fileContainer,
            IStringLocalizer<ComplianceSystemResource> localizer
            )
        {
            _attachmentRepository = attachmentRepository;
            _attachmentFileRepository = attachmentFileRepository;
            _fileContainer = fileContainer;
            _localizer = localizer;
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

        public async Task<AttachmentFile> DeleteFile(Guid attachmentId, Guid fileId)
        {
            return await _attachmentFileRepository.SingleOrDefaultAsync(t => t.Id == fileId && t.AttachmentId == attachmentId);
        }

        private void SaveFile(IFormFile file, AttachmentFile attachmentFile)
        {
            using (var stream = new MemoryStream())
            {
                file.CopyTo(stream);
                _fileContainer.SaveAsync(attachmentFile.Name, stream).Wait();
            }
        }
        public async Task<IRemoteStreamContent> DownloadFile(Guid fileId)
        {
            var file = await _attachmentFileRepository.SingleOrDefaultAsync(t => t.Id == fileId);
            if (file != null)
            {
                var f = await _fileContainer.GetAsync(file.Name);

                return new RemoteStreamContent(f);
            }

            else
            {
                throw new UserFriendlyException(_localizer["AttachmentFileNotFoundException"]);
            }
        }

        public async Task<IRemoteStreamContent> DownloadAttachmentFilesAsZip(Guid attachmentId)
        {
            var attachment = (await _attachmentRepository.WithDetailsAsync()).SingleOrDefault(t => t.Id == attachmentId);
            if (attachment != null && attachment.AttachmentFiles != null && attachment.AttachmentFiles.Count > 0)
            {
                string fileName = $"{DateTime.Now.ToString("dd-MM-yyyy_HH-mm")}.zip";
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    using (var archive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
                    {
                        foreach (var item in attachment.AttachmentFiles)
                        {
                            var demoFile = archive.CreateEntry(item.DisplayName);
                            using (var entryStream = demoFile.Open())
                            {
                                var file = await _fileContainer.GetAsync(item.Name);
                                file.CopyTo(entryStream);
                            }
                        }

                        await _fileContainer.SaveAsync(fileName, memoryStream.GetAllBytes());

                    }

                    IRemoteStreamContent result = new RemoteStreamContent(await _fileContainer.GetAsync(fileName));
                    await _fileContainer.DeleteAsync(fileName);
                    return result;
                }
            }
            else
            {
                throw new UserFriendlyException(_localizer["AttachmentFileNotFoundException"]);
            }
        }

    }
}
