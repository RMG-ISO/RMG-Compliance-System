using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;

namespace RMG.ComplianceSystem.Policies
{
    public class PolicyManager : DomainService 
    {
        private readonly IRepository<Policy , Guid> _policyRepository;
        public PolicyManager(IRepository<Policy, Guid> policyRepository)
        {
            _policyRepository = policyRepository;
        }

        public Task <Policy> CreateAsync(string code , string nameEn ,  string nameAr , string description , IList<Guid> OwnersIds, IList<Guid> approversIds , IList<Guid> reviewersIds , IList<Guid> categoriesIds , int ? compliancePercentage = null, PolicyType? type = null)
        {
            return Task.FromResult(new Policy());

        }
    }
}
