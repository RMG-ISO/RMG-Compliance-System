using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.Employees
{
    public interface IEmployeeRepository : IRepository<Employee, Guid>
    {
    }
}