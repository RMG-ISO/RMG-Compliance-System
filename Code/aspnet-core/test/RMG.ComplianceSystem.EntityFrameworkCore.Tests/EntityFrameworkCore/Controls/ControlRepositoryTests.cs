using System;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Controls;
using Volo.Abp.Domain.Repositories;
using Xunit;

namespace RMG.ComplianceSystem.EntityFrameworkCore.Controls
{
    public class ControlRepositoryTests : ComplianceSystemEntityFrameworkCoreTestBase
    {
        private readonly IControlRepository _controlRepository;

        public ControlRepositoryTests()
        {
            _controlRepository = GetRequiredService<IControlRepository>();
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
