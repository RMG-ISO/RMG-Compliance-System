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
using Volo.Abp.BlobStoring;
using System.Linq;
using System.IO;
using System.IO.Compression;

namespace RMG.ComplianceSystem.Attachments
{
    public class AttachmentAppService : ComplianceSystemAppService, IAttachmentAppService
    {


        private readonly IAttachmentRepository _attachmentRepository;
        private readonly IAttachmentFileRepository _attachmentFileRepository;
        private readonly IBlobContainer<AttachmentFileContainer> _fileContainer;
        private readonly AttachmentManager _attachmentManager;

        public AttachmentAppService(
            IAttachmentRepository attachmentRepository,
            IAttachmentFileRepository attachmentFileRepository,
            IBlobContainer<AttachmentFileContainer> fileContainer,
            AttachmentManager attachmentManager
            )
        {
            _attachmentRepository = attachmentRepository;
            _attachmentFileRepository = attachmentFileRepository;
            _fileContainer = fileContainer;
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
                throw new UserFriendlyException(L["AttachmentFileNotFoundException"]);
            }

        }

        public async Task<IRemoteStreamContent> GetDownloadFile(Guid fileId)
        {
            var file = _attachmentFileRepository.SingleOrDefault(t => t.Id == fileId);
            if (file != null)
            {
                var f = await _fileContainer.GetAsync(file.Name);

                return new RemoteStreamContent(f);
            }

            else
            {
                throw new UserFriendlyException(L["AttachmentFileNotFoundException"]);
            }
        }




        //private async Task<string> SaveBase64StringAsync(string inputBase64String, string name)
        //{
        //    var data = inputBase64String.Split(",");
        //    var hdr = data[0];
        //    var img = data[1];
        //    var contentType = hdr.Replace(";base64", "").Replace("data:", "");
        //    var ext = MimeTypes.MimeTypeMap.GetExtension(contentType);

        //    byte[] imgbytes = Convert.FromBase64String(img);
        //    //forFolderAutoGenerated

        //    if (await _fileContainer.ExistsAsync(name))
        //        name += "_" + Shared.Utility.KeyGenerator.GetUniqueKey(3);

        //    await _fileContainer.SaveAsync($"{name}{ext}", imgbytes, true);
        //    return $"{name}{ext}";
        //}

        //private async Task<IActionResult> GetFile(string fileName)
        //{


        //    var fileBytes = await _fileContainer.GetAllBytesAsync(fileName);
        //    var contentType = MimeTypes.MimeTypeMap.GetMimeType(fileName);
        //    var fileStream = new MemoryStream(fileBytes);

        //    return new FileStreamResult(fileStream, contentType ?? "application/octet-stream")
        //    {
        //        FileDownloadName = data.FileName
        //    };
        //}



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
