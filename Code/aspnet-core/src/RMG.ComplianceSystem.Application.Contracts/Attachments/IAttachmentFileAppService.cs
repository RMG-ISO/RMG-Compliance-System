using System;
using RMG.ComplianceSystem.Attachments.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Attachments
{
    public interface IAttachmentFileAppService :
        ICrudAppService< 
            AttachmentFileDto, 
            Guid, 
            PagedAndSortedResultRequestDto,
            CreateUpdateAttachmentFileDto,
            CreateUpdateAttachmentFileDto>
    {

    }
}