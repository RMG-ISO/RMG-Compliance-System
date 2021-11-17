using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Assessments
{
    public class AssessmentRepository : EfCoreRepository<ComplianceSystemDbContext, Assessment, Guid>, IAssessmentRepository
    {
        public AssessmentRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<Assessment>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<Assessment> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}