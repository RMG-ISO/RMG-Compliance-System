using System;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Frameworks;
using Volo.Abp.Domain.Repositories;
using Xunit;

namespace RMG.ComplianceSystem.EntityFrameworkCore.Frameworks
{
    public class FrameworkRepositoryTests : ComplianceSystemEntityFrameworkCoreTestBase
    {
        private readonly IFrameworkRepository _frameworkRepository;

        public FrameworkRepositoryTests()
        {
            _frameworkRepository = GetRequiredService<IFrameworkRepository>();
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
