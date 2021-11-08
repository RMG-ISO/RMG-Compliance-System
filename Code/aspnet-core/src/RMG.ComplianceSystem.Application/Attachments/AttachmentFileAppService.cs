using System;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.Attachments.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Attachments
{
    public class AttachmentFileAppService : CrudAppService<AttachmentFile, AttachmentFileDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateAttachmentFileDto, CreateUpdateAttachmentFileDto>,
        IAttachmentFileAppService
    {
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.AttachmentFile.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.AttachmentFile.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.AttachmentFile.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.AttachmentFile.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.AttachmentFile.Delete;

        private readonly IAttachmentFileRepository _repository;
        
        public AttachmentFileAppService(IAttachmentFileRepository repository) : base(repository)
        {
            _repository = repository;
        }
    }
}
