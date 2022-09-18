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

namespace RMG.ComplianceSystem.EmailTemplates
{
    public class EmailTemplateAppService : CrudAppService<
        EmailTemplate,
        EmailTemplateDto, 
        Guid, EmailTemplatePagedAndSortedResultRequestDto,
        CreateUpdateEmailTemplateDto>,
          IEmailTemplateAppService
    {
        //protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.EmailTemplate.Default;
        //protected override string GetListPolicyName { get; set; } =ComplianceSystemPermissions.EmailTemplate.Default;
        //protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.EmailTemplate.Create;
        //protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.EmailTemplate.Update;
        //protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.EmailTemplate.Delete;

        private readonly IEmailTemplateRepository _emailTemplateRepository;
        private readonly IDataFilter _dataFilter;

        public EmailTemplateAppService(IEmailTemplateRepository emailTemplateRepository
                                        , IDataFilter dataFilter) : base(emailTemplateRepository)
        {
            _emailTemplateRepository = emailTemplateRepository;
            _dataFilter = dataFilter;
        }

        /// <summary>
        /// get deleted list
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<EmailTemplateDto>> GetListDeletedAsync(EmailTemplatePagedAndSortedResultRequestDto input)
        {
           // await CheckGetListPolicyAsync();

            //Temporary disable the ISoftDelete filter
            using (_dataFilter.Disable<ISoftDelete>())
            {
                var query = await CreateFilteredQueryAsync(input);

                query = query.Where(q => q.IsDeleted);

                var totalCount = await AsyncExecuter.CountAsync(query);

                query = ApplySorting(query, input);
                query = ApplyPaging(query, input);

                var entities = await AsyncExecuter.ToListAsync(query);
                var entityDtos = await MapToGetListOutputDtosAsync(entities);

                return new PagedResultDto<EmailTemplateDto>(
                    totalCount,
                    entityDtos
                );
            }
        }

        /// <summary>
        /// this method to get all Data with sorting and paging
        /// </summary>
        /// <param name="input">SkipCount,MaxResultCount, Sorting,
        ///Title, StandardName, IssueType, FactoryType, RevisionDate and Status</param>
        /// <returns></returns>
        protected async override Task<IQueryable<EmailTemplate>> CreateFilteredQueryAsync(EmailTemplatePagedAndSortedResultRequestDto input)
        {
          //  await CheckGetListPolicyAsync();

            return await Task.FromResult(Repository.GetListAsync().Result.Where(x =>
                                          (string.IsNullOrEmpty(input.Key) || input.Key == x.Key) &&
                                          (string.IsNullOrEmpty(input.Subject) || input.Subject == x.Subject)
                                          ).AsQueryable());

        }

        /// <summary>
        /// this method get Context by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        protected override async Task<EmailTemplate> GetEntityByIdAsync(Guid id)
        {
           // await CheckGetPolicyAsync();

            using (_dataFilter.Disable<ISoftDelete>())
            {
                return await Repository.GetAsync(id, true);
            }
        }

        [RemoteService(false)]
        [AllowAnonymous]
        public async Task<EmailTemplateDto> RenderTemplate(string TemplateKey, ExpandoObject data)
        {
            var entity = await Repository.GetAsync(t => t.Key == TemplateKey);

            var props = data as IDictionary<string, Object>;
            var newBody = entity.Body;
            foreach (var prop in props)
            {
                var findPattern = $@"{{{{model.{prop.Key}}}}}";
                if (prop.Value != null)
                {
                    newBody = Regex.Replace(newBody, findPattern, prop.Value.ToString(), RegexOptions.IgnoreCase);
                }
            }
            newBody = Regex.Replace(newBody, "{{model.*}}", "", RegexOptions.IgnoreCase);
            var entityDto = MapToGetOutputDto(entity);
            entityDto.Body = newBody;
            return entityDto;
        }

        [RemoteService(false)]
        [AllowAnonymous]
        public async Task<EmailTemplateDto> RenderTemplateNotification(string TemplateKey, ExpandoObject data)
        {
            var entity = await Repository.GetAsync(t => t.Key == TemplateKey);

            var props = data as IDictionary<string, Object>;
            var newBody = entity.NotificationBody;
            foreach (var prop in props)
            {
                var findPattern = $@"{{{{model.{prop.Key}}}}}";
                if (prop.Value != null)
                {
                    newBody = Regex.Replace(newBody, findPattern, prop.Value.ToString(), RegexOptions.IgnoreCase);
                }
            }
            newBody = Regex.Replace(newBody, "{{model.*}}", "", RegexOptions.IgnoreCase);
            var entityDto = MapToGetOutputDto(entity);
            entityDto.NotificationBody = newBody;
            return entityDto;
        }
    }


}
