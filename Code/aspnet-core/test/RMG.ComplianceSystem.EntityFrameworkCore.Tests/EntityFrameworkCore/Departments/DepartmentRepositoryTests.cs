using System;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Departments;
using Volo.Abp.Domain.Repositories;
using Xunit;

namespace RMG.ComplianceSystem.EntityFrameworkCore.Departments
{
    public class DepartmentRepositoryTests : ComplianceSystemEntityFrameworkCoreTestBase
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentRepositoryTests()
        {
            _departmentRepository = GetRequiredService<IDepartmentRepository>();
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
