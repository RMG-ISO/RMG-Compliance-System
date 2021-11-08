using System;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.Attachments.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using System.Threading.Tasks;

namespace RMG.ComplianceSystem.Attachments
{
    public class AttachmentAppService : CrudAppService<Attachment, AttachmentDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateAttachmentDto, CreateUpdateAttachmentDto>,
        IAttachmentAppService
    {
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.Attachment.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.Attachment.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.Attachment.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.Attachment.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.Attachment.Delete;

        private readonly IAttachmentRepository _repository;
        
        public AttachmentAppService(IAttachmentRepository repository) : base(repository)
        {
            _repository = repository;
        }

        protected override Task<System.Linq.IQueryable<Attachment>> CreateFilteredQueryAsync(PagedAndSortedResultRequestDto input)
        {
            return Repository.WithDetailsAsync();
        }

        protected override Task<Attachment> GetEntityByIdAsync(Guid id)
        {
            return Repository.GetAsync(id);
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
