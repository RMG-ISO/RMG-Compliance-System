using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.RiskTreatments
{
    public class RiskTreatmentRepository : EfCoreRepository<ComplianceSystemDbContext, RisksTreatment, Guid>, IRiskTreatmentRepository
    {
        public RiskTreatmentRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<RisksTreatment>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<RisksTreatment> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}
