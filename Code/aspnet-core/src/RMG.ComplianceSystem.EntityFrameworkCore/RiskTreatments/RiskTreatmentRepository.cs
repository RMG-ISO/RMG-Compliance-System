using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.RiskTreatments
{
    public class RiskTreatmentRepository : EfCoreRepository<ComplianceSystemDbContext, RiskTreatment, Guid>, IRiskTreatmentRepository
    {
        public RiskTreatmentRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<RiskTreatment>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<RiskTreatment> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}
