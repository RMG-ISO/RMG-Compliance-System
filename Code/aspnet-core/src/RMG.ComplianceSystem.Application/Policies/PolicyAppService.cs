using Polly;
using RMG.ComplianceSystem.Employees;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using RMG.ComplianceSystem;

namespace RMG.ComplianceSystem.Policies
{
    public class PolicyAppService : CrudAppService<Policy, PolicyDto, Guid, GetListPoliciesDto, CreatePolicyDto, UpdatePolicyDto>
    {
        private readonly IRepository<Policy, Guid> _repository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IRepository<Category, Guid> _categoryRepository;

        public PolicyAppService(IRepository<Policy, Guid> repository, IEmployeeRepository employeeRepository, IRepository<Category, Guid> categoryRepository) : base(repository)
        {
            _repository = repository;
            _employeeRepository = employeeRepository;
            _categoryRepository = categoryRepository;
        }

        public override  async Task<PolicyDto> CreateAsync(CreatePolicyDto input)
        {
            // employees check (reviewers , approvals , owners)
            var employeesIds = (await _employeeRepository.GetQueryableAsync()).Select(x => x.Id).ToList();
            if (!employeesIds.All(input.EmployeesIds.Contains))
                throw new UserFriendlyException(L["EmployeesNotExists"]);

            //category check
            var categoriesIds = (await _categoryRepository.GetQueryableAsync()).Select(x => x.Id).ToList();
            if (!categoriesIds.All(input.CategoryIds.Contains))
                throw new UserFriendlyException(L["CategoryNotExists"]);

            Random random = new Random();
            string code = new string(
                Enumerable.Repeat(ComplianceSystemConsts.chars, 6)
                          .Select(s => s[random.Next(s.Length)])
                          .ToArray());
            var policy = new Policy()
            {
                Code = code,
                CompliancePercentage = 0,
                NameEn = input.NameEn,
                NameAr = input.NameAr,
                Description = input.Description,
                Type = input.Type,
                Status = PolicyStatus.Draft,
                PolicyCategories = (await _categoryRepository.GetQueryableAsync()).Where(x => input.CategoryIds.Contains(x.Id)).ToList(),
            };

            policy.AddApprover(input.ApproversIds);
            policy.AddReviewers(input.ReviewersIds);
            policy.AddOwners(input.OwnersIds);
            await Repository.InsertAsync(policy);
            var response = ObjectMapper.Map<Policy,PolicyDto>(policy);
            return response;
        }

        public override Task<PolicyDto> UpdateAsync(Guid id, UpdatePolicyDto input)
        {
            return base.UpdateAsync(id, input);
        }
    }
}
