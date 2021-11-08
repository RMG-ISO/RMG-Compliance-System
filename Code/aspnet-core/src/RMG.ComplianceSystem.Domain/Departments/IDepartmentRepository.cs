using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.Departments
{
    public interface IDepartmentRepository : IRepository<Department, Guid>
    {
    }
}