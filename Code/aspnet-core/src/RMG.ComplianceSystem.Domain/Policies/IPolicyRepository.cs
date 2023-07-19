using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.Policies
{
    public interface IPolicyRepository : IRepository<Policy , Guid>
    {
    }
}
