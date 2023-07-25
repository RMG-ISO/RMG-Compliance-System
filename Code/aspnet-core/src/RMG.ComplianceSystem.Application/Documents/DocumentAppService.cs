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
using RMG.ComplianceSystem.Documents.Dtos;
using RMG.ComplianceSystem.Shared;
using Volo.Abp.Data;
using AutoMapper.Internal;

namespace RMG.ComplianceSystem.Documents
{
    public class DocumentAppService : CrudAppService<Document, DocumentDto, Guid, DocumentGetListInputDto, CreateDocumentDto>, IDocumentAppService
    {
        private readonly IDataFilter _dataFilter;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IRepository<Category, Guid> _categoryRepository;

        public DocumentAppService(
            IDocumentRepository repository, 
            IEmployeeRepository employeeRepository, 
            IRepository<Category, Guid> categoryRepository,
            IDataFilter dataFilter
            ) : base(repository)
        {
            _dataFilter = dataFilter;
            _employeeRepository = employeeRepository;
            _categoryRepository = categoryRepository;
        }

        public override async Task<DocumentDto> CreateAsync(CreateDocumentDto input)
        {
            await CheckCreatePolicyAsync();
            await ValidateCreateUpdate(input);
            var entity = await MapToEntityAsync(input);
            using (_dataFilter.Disable<ISoftDelete>())
            {
                entity.Code = "DOC-" + (await Repository.CountAsync()) + 1;
            }
            entity.Status = DocumentStatus.Draft;
            MapCategories(entity, input.CategoriesIds.ToList());
            MapOwners(entity, input.OwnersIds.ToList());
            MapReviewers(entity, input.RequiredReviewersIds.ToList(), input.OptionalReviewersIds.ToList());
            MapApprovers(entity, input.RequiredApproversIds.ToList(), input.OptionalApproversIds.ToList());

            await Repository.InsertAsync(entity, autoSave: true);
            return await MapToGetOutputDtoAsync(entity);
        }

        public override async Task<DocumentDto> UpdateAsync(Guid id, CreateDocumentDto input)
        {
            await CheckUpdatePolicyAsync();
            var entity = await Repository.GetAsync(id);
            await MapToEntityAsync(input, entity);
            MapCategories(entity, input.CategoriesIds.ToList());
            MapOwners(entity, input.OwnersIds.ToList());
            MapReviewers(entity, input.RequiredReviewersIds.ToList(), input.OptionalReviewersIds.ToList());
            MapApprovers(entity, input.RequiredApproversIds.ToList(), input.OptionalApproversIds.ToList());

            await Repository.UpdateAsync(entity, true);
            return await MapToGetOutputDtoAsync(entity);
        }
        
        public async Task<List<NameId<Guid>>> GetAllCategories()
        {
            var categories = (await _categoryRepository.GetQueryableAsync()).ToList();

            return ObjectMapper.Map<List<Category>, List<NameId<Guid>>>(categories);
        }

        protected override async Task<IQueryable<Document>> CreateFilteredQueryAsync(DocumentGetListInputDto input)
        {
            var query = await base.CreateFilteredQueryAsync(input);
            query = query.WhereIf(!input.Code.IsNullOrEmpty(), x => x.Code.Contains(input.Code))
                        .WhereIf(!input.Name.IsNullOrEmpty(), x => x.Name.Contains(input.Name));
            return query;
        }

        private async Task ValidateCreateUpdate(CreateDocumentDto input)
        {
            // employees check (reviewers , approvals , owners)
            var employeesIds = (await _employeeRepository.GetQueryableAsync()).Select(x => x.Id).ToList();
            if (!input.EmployeesIds.All(employeesIds.Contains))
                throw new UserFriendlyException(L["EmployeesNotExists"]);

            //category check
            var categoriesIds = (await _categoryRepository.GetQueryableAsync()).Select(x => x.Id).ToList();
            if (!input.CategoriesIds.All(categoriesIds.Contains))
                throw new UserFriendlyException(L["CategoryNotExists"]);

        }

        private void MapApprovers(Document document, List<Guid> requiredApprovers, List<Guid> optionalApprovers)
        {
            foreach (var item in requiredApprovers)
            {
                document.Approvers.Add(new DocumentApprover(GuidGenerator.Create(), item, true));
            }

            foreach (var item in optionalApprovers)
            {
                document.Approvers.Add(new DocumentApprover(GuidGenerator.Create(), item, false));
            }
        }

        private void MapReviewers(Document document, List<Guid> requiredReviewers, List<Guid> optionalReviewers)
        {
            foreach (var item in requiredReviewers)
            {
                document.Reviewers.Add(new DocumentReviewer(GuidGenerator.Create(), item, true));
            }

            foreach (var item in optionalReviewers)
            {
                document.Reviewers.Add(new DocumentReviewer(GuidGenerator.Create(), item, false));
            }
        }

        private void MapCategories(Document document, List<Guid> categories)
        {
            foreach (var item in categories)
            {
                document.DocumentCategories.Add(new DocumentCategory(GuidGenerator.Create(), item));
            }
        }

        private void MapOwners(Document document, List<Guid> owners)
        {
            foreach (var item in owners)
            {
                document.Owners.Add(new DocumentOwner(GuidGenerator.Create(), item));
            }
        }

        private string GetEmployeeNameById(Guid id, List<Employee> employees = null)
        {
            return employees.First(x => x.Id == id).FullName;
        }
    }
}
