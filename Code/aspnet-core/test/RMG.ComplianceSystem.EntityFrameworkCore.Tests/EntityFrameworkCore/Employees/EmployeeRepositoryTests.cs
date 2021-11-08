using System;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Employees;
using Volo.Abp.Domain.Repositories;
using Xunit;

namespace RMG.ComplianceSystem.EntityFrameworkCore.Employees
{
    public class EmployeeRepositoryTests : ComplianceSystemEntityFrameworkCoreTestBase
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeRepositoryTests()
        {
            _employeeRepository = GetRequiredService<IEmployeeRepository>();
        }

        /*
        [Fact]
        public async Task Test1()
        {
            await WithUnitOfWorkAsync(async () =>
            {
                // Arrange

                // Act

                //Assert
            });
        }
        */
    }
}
