using System;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.EmailTemplates.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Microsoft.AspNetCore.Authorization;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Dynamic;
using System.Collections.Generic;
using System.Linq;
using Volo.Abp;
using Volo.Abp.Data;
using RMG.ComplianceSystem.EmailTemplates;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.EmailTemplates
{
    public class TemplateEmailtestAppService : CrudAppService<
        EmailTemplate,
        EmailTemplateDto,
        Guid,
        EmailTemplatePagedAndSortedResultRequestDto,
        CreateUpdateEmailTemplateDto>,
          IEmailTemplateAppService
    {
        //protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.EmailTemplate.Default;
        //protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.EmailTemplate.Default;
        //protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.EmailTemplate.Create;
        //protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.EmailTemplate.Update;
        //protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.EmailTemplate.Delete;

        private readonly IEmailTemplateRepository _emailTemplateRepository;
        private readonly IdentityUserManager User;

        public TemplateEmailtestAppService(IEmailTemplateRepository emailTemplateRepository, IdentityUserManager user) : base(emailTemplateRepository)
        {
            _emailTemplateRepository = emailTemplateRepository;
            User=user;
        }

        public Task<EmailTemplateDto> RenderTemplate(string TemplateKey, ExpandoObject data)
        {
            throw new NotImplementedException();
        }

        public Task<EmailTemplateDto> RenderTemplateNotification(string TemplateKey, ExpandoObject data)
        {
            throw new NotImplementedException();
        }

        public Task<PagedResultDto<EmailTemplateDto>> GetListDeletedAsync(EmailTemplatePagedAndSortedResultRequestDto input)
        {
            throw new NotImplementedException();
        }
        public async Task<PagedResultDto<EmailTemplateDto>> GetListByFilter(EmailTemplatePagedAndSortedResultRequestDto input)
        {
            List<EmailTemplateDto> Risks = new List<EmailTemplateDto>();
            int totalCount = 0;
            if (input.Key != null)
            {
                //get Risk By CategoryId and Filters and Pagination
                var ListRisks = (await _emailTemplateRepository.GetQueryableAsync()).Where(x => x.Key == input.Key)
                 .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping RiskAndOpportunity to EmailTemplateDto
                Risks = ObjectMapper.Map<List<EmailTemplate>, List<EmailTemplateDto>>(ListRisks);
                var risk = (await _emailTemplateRepository.GetQueryableAsync()).Where(x => x.Key == input.Key).ToList();
                totalCount = risk.Count;
            }
            else
            {
                //get Risk By CategoryId and Filters and Pagination
                var ListDoc = (await _emailTemplateRepository.GetQueryableAsync()).Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping RiskAndOpportunity to EmailTemplateDto
                Risks = ObjectMapper.Map<List<EmailTemplate>, List<EmailTemplateDto>>(ListDoc);
                var risk = (await _emailTemplateRepository.GetQueryableAsync()).ToList();
                totalCount = risk.Count;
            }
            if (!string.IsNullOrEmpty(input.Sorting))
            {
                var propertyInfo = typeof(EmailTemplateDto).GetProperty(input.Sorting);
                Risks.OrderBy(p => propertyInfo.GetValue(p, null));
            }
            var RisksData = new List<EmailTemplateDto>();
            foreach (var item in Risks)
            {
                var Risk = new EmailTemplateDto();
                Risk = item;
                if (Risk.CreatorId != null)
                {
                    var getuser = User.GetByIdAsync((Guid)Risk.CreatorId).Result;
                    Risk.Creator = ObjectMapper.Map<IdentityUser, IdentityUserDto>(getuser);
                }

                RisksData.Add(Risk);
            }
            return new PagedResultDto<EmailTemplateDto>(
                totalCount,
                RisksData
            );
       
        } 

    }


}
