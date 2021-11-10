using System;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Domains;
using Volo.Abp.Domain.Repositories;
using Xunit;

namespace RMG.ComplianceSystem.EntityFrameworkCore.Domains
{
    public class DomainRepositoryTests : ComplianceSystemEntityFrameworkCoreTestBase
    {
        private readonly IDomainRepository _domainRepository;

        public DomainRepositoryTests()
        {
            _domainRepository = GetRequiredService<IDomainRepository>();
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
