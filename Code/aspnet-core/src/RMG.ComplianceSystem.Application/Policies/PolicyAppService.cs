using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using RMG.ComplianceSystem.Attachments.Dtos;
using RMG.ComplianceSystem.Authors;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.policies;
using RMG.ComplianceSystem.Policies.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.Policies
{
   // [Authorize(ComplianceSystemPermissions.Policy.Default)]
    public class PolicyAppService :
        CrudAppService<
            Policy, //The Policy entity
            PolicyDto, //Used to show Policys
            Guid, //Primary key of the Policy entity
            PagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdatePolicyDto>, //Used to create/update a Policy
        IPolicyAppService //implement the IPolicyAppService
    {

        private readonly IPolicyRepository repository;

        public PolicyAppService(
            IPolicyRepository _repository)

            : base(_repository)
        {
            repository = _repository;   
            GetPolicyName = ComplianceSystemPermissions.Policy.Default;
            GetListPolicyName = ComplianceSystemPermissions.Policy.Default;
            CreatePolicyName = ComplianceSystemPermissions.Policy.Create;
            UpdatePolicyName = ComplianceSystemPermissions.Policy.Update;
            DeletePolicyName = ComplianceSystemPermissions.Policy.Delete;
        }

        public override async Task<PolicyDto> GetAsync(Guid id)
        {
            await CheckGetPolicyAsync();

            //Prepare a query to join Policys and authors
            var query = from Policy in Repository
                        where Policy.Id == id
                        select new { Policy };

            //Execute the query and get the Policy with author
            var queryResult = await AsyncExecuter.FirstOrDefaultAsync(query);
            if (queryResult == null)
            {
                throw new EntityNotFoundException(typeof(Policy), id);
            }

            var PolicyDto = ObjectMapper.Map<Policy, PolicyDto>(queryResult.Policy);
            return PolicyDto;
        }

        public override async Task<PagedResultDto<PolicyDto>> GetListAsync(
            PagedAndSortedResultRequestDto input)
        {
           // await CheckGetListPolicyAsync();

            //Prepare a query to join Policys and authors
            var query = from Policy in Repository
                        orderby input.Sorting
                        select new { Policy};

            query = query
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount);

            //Execute the query and get a list
            var queryResult = await AsyncExecuter.ToListAsync(query);

            //Convert the query result to a list of PolicyDto objects
            var PolicyDtos = queryResult.Select(x =>
            {
                var PolicyDto = ObjectMapper.Map<Policy, PolicyDto>(x.Policy);
                return PolicyDto;
            }).ToList();

            //Get the total count with another query
            var totalCount = await Repository.GetCountAsync();

            return new PagedResultDto<PolicyDto>(
                totalCount,
                PolicyDtos
            );
        }

     

         }
}
