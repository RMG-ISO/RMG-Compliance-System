using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.EntityFrameworkCore;
using RMG.ComplianceSystem.Policies;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Policies
{
    public class PolicyRepository : EfCoreRepository<ComplianceSystemDbContext, Policy, Guid>, IPolicyRepository
    {
        public PolicyRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

      
    }
}