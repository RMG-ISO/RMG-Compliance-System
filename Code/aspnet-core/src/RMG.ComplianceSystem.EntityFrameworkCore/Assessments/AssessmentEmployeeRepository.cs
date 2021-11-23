using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Assessments
{
    public class AssessmentEmployeeRepository : EfCoreRepository<ComplianceSystemDbContext, AssessmentEmployee>, IAssessmentEmployeeRepository
    {
        public AssessmentEmployeeRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<AssessmentEmployee>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<AssessmentEmployee> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}