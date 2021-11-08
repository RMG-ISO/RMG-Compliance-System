using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.Attachments
{
    public interface IAttachmentFileRepository : IRepository<AttachmentFile, Guid>
    {
    }
}