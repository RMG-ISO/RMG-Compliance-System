using RMG.ComplianceSystem.EmailTemplates.Dtos;
using System;
using System.Dynamic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.EmailTemplates
{
    public interface IEmailTemplateAppService : 
        ICrudAppService<
            EmailTemplateDto,
            Guid,
            EmailTemplatePagedAndSortedResultRequestDto,
            CreateUpdateEmailTemplateDto,
            CreateUpdateEmailTemplateDto>
    {
        Task<EmailTemplateDto> RenderTemplate(string TemplateKey, ExpandoObject data);
        Task<EmailTemplateDto> RenderTemplateNotification(string TemplateKey, ExpandoObject data);
        Task<PagedResultDto<EmailTemplateDto>> GetListDeletedAsync(EmailTemplatePagedAndSortedResultRequestDto input);

    }
}