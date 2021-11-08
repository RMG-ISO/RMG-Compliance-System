using Shouldly;
using System.Threading.Tasks;
using Xunit;

namespace RMG.ComplianceSystem.Frameworks
{
    public class FrameworkAppServiceTests : ComplianceSystemApplicationTestBase
    {
        private readonly IFrameworkAppService _frameworkAppService;

        public FrameworkAppServiceTests()
        {
            _frameworkAppService = GetRequiredService<IFrameworkAppService>();
        }

        /*
        [Fact]
        public async Task Test1()
        {
            // Arrange

            // Act

            // Assert
        }
        */
    }
}
