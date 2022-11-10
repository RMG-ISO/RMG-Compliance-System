using RMG.ComplianceSystem.DepartmentUsers;
using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.DepartmentUsers
{
    public interface IDepartmentUserRepository : IRepository<DepartmentUser, Guid>
    {
    }
}