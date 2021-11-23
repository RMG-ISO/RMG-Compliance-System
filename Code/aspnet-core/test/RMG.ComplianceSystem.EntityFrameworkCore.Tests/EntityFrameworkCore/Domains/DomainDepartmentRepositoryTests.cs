using System;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Domains;
using Volo.Abp.Domain.Repositories;
using Xunit;

namespace RMG.ComplianceSystem.EntityFrameworkCore.Domains
{
    public class DomainDepartmentRepositoryTests : ComplianceSystemEntityFrameworkCoreTestBase
    {
        private readonly IDomainDepartmentRepository _domainDepartmentRepository;

        public DomainDepartmentRepositoryTests()
        {
            _domainDepartmentRepository = GetRequiredService<IDomainDepartmentRepository>();
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
