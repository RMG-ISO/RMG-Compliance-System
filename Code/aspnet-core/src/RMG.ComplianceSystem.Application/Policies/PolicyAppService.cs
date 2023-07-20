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
        private readonly IPolicyRepository _repository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IRepository<Category, Guid> _categoryRepository;

        public PolicyAppService(IPolicyRepository repository, IEmployeeRepository employeeRepository, IRepository<Category, Guid> categoryRepository) : base(repository)
        {
            _repository = repository;
            _employeeRepository = employeeRepository;
            _categoryRepository = categoryRepository;
        }

        public override  async Task<PolicyDto> CreateAsync(CreatePolicyDto input)
        {
            // employees check (reviewers , approvals , owners)
            var employeesIds = (await _employeeRepository.GetQueryableAsync()).Select(x => x.Id).ToList();
            //if (employeesIds.All(input.EmployeesIds.Contains))
            //    throw new UserFriendlyException(L["EmployeesNotExists"]);

            //category check
            //var categoriesIds = (await _categoryRepository.GetQueryableAsync()).Select(x => x.Id).ToList();
            //if (!categoriesIds.All(input.CategoryIds.Contains))
            //    throw new UserFriendlyException(L["CategoryNotExists"]);

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
            policy.SetValidationDate(input.ValidationStartDate, input.ValidationEndtDate);
            var employees = (await _employeeRepository.GetQueryableAsync()).Where(x => input.EmployeesIds.Contains(x.Id)).ToList();
            await Repository.InsertAsync(policy,autoSave :true);
            return MapToPolicyDto(policy, employees);
        }

        public override async Task<PolicyDto> UpdateAsync(Guid id, UpdatePolicyDto input)
        {
            var policy = await Repository.GetAsync(id);
            policy.AddReviewers(input.ReviewersIds);
            policy.AddApprover(input.ApproversIds);
            policy.AddOwners(input.OwnersIds);
            policy.SetValidationDate(input.ValidationStartDate, input.ValidationEndtDate);
            var employees  = (await _employeeRepository.GetQueryableAsync()).Where(x => input.EmployeesIds.Contains(x.Id)).ToList();
            await Repository.UpdateAsync(policy);
            return MapToPolicyDto(policy, employees);
        }

        public override async Task<PagedResultDto<PolicyDto>> GetListAsync(GetListPoliciesDto input)
        {
            var policies = await _repository.GetListAsync(input.Status, input.Type, input.Sorting, input.MaxResultCount, input.SkipCount);
            var employees = (await _employeeRepository.GetQueryableAsync()).ToList();
            return new PagedResultDto<PolicyDto>
            {
                Items = policies.Item1.Select(x => MapToPolicyDto(x, employees)).ToList(),
                TotalCount = policies.count
            };
        }
        public async Task<ListResultDto<CategoryDto>> GetAllCategories()
        {
            var categories = (await _categoryRepository.GetQueryableAsync()).ToList();

            return new ListResultDto<CategoryDto>(ObjectMapper.Map<List<Category>,List<CategoryDto>>(categories));
        }

        protected   PolicyDto MapToPolicyDto(Policy entity,List<Employee> employees)
        {
            var dto = ObjectMapper.Map<Policy,PolicyDto>(entity);
            dto.ApproversIds = entity.Approvers.Select(x => new PolicyEmployeeDto { EmployeeId = x.EmployeeId , EmployeeName = GetEmployeeNameById(x.EmployeeId , employees) }).ToList();
            dto.OwnersIds = entity.Owners.Select(x => new PolicyEmployeeDto { EmployeeId = x.EmployeeId, EmployeeName = GetEmployeeNameById(x.EmployeeId, employees) }).ToList();
            dto.ReviewersIds = entity.Reviewers.Select(x => new PolicyEmployeeDto { EmployeeId = x.EmployeeId, EmployeeName = GetEmployeeNameById(x.EmployeeId, employees) }).ToList();
            dto.CategoryIds = ObjectMapper.Map<List<Category>, List<CategoryDto>>(entity.PolicyCategories.ToList());
            return dto;
        }
        private string GetEmployeeNameById(Guid id , List<Employee> employees = null)
        {
            return employees.First(x => x.Id == id).FullName;
        }
    }
}
