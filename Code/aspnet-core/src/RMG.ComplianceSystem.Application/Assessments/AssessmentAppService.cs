using System;
using RMG.ComplianceSystem.Permissions;
using RMG.ComplianceSystem.Assessments.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using System.Threading.Tasks;
using System.Linq;
using Volo.Abp;

namespace RMG.ComplianceSystem.Assessments
{
    public class AssessmentAppService : CrudAppService<Assessment, AssessmentDto, Guid, AssessmentPagedAndSortedResultRequestDto, CreateUpdateAssessmentDto, CreateUpdateAssessmentDto>,
        IAssessmentAppService
    {
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.Assessment.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.Assessment.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.Assessment.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.Assessment.Update;
        //protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.Assessment.Delete;

        private readonly IAssessmentRepository _repository;
        
        public AssessmentAppService(IAssessmentRepository repository) : base(repository)
        {
            _repository = repository;
        }

        protected override Task<IQueryable<Assessment>> CreateFilteredQueryAsync(AssessmentPagedAndSortedResultRequestDto input)
        {
            return base.CreateFilteredQueryAsync(input);
        }

        protected override Task<Assessment> GetEntityByIdAsync(Guid id)
        {
            return base.GetEntityByIdAsync(id);
        }


       

        

        public override Task<AssessmentDto> CreateAsync(CreateUpdateAssessmentDto input)
        {
            input.ComplianceDate = Clock.Now;
            return base.CreateAsync(input);
        }

        public override Task<AssessmentDto> UpdateAsync(Guid id, CreateUpdateAssessmentDto input)
        {
            input.ComplianceDate = Clock.Now;
            return base.UpdateAsync(id, input);
        }

        public override Task<AssessmentDto> GetAsync(Guid id)
        {
            return base.GetAsync(id);
        }



        [RemoteService(false)]
        public override Task DeleteAsync(Guid id)
        {
            return base.DeleteAsync(id);
        }

        [RemoteService(false)]
        public override Task<PagedResultDto<AssessmentDto>> GetListAsync(AssessmentPagedAndSortedResultRequestDto input)
        {
            return base.GetListAsync(input);
        }
    }
}
