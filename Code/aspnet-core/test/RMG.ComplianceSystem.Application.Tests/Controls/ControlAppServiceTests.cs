using Shouldly;
using System.Threading.Tasks;
using Xunit;

namespace RMG.ComplianceSystem.Controls
{
    public class ControlAppServiceTests : ComplianceSystemApplicationTestBase
    {
        private readonly IControlAppService _controlAppService;

        public ControlAppServiceTests()
        {
            _controlAppService = GetRequiredService<IControlAppService>();
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
