using Shouldly;
using System.Threading.Tasks;
using Xunit;

namespace RMG.ComplianceSystem.Domains
{
    public class DomainAppServiceTests : ComplianceSystemApplicationTestBase
    {
        private readonly IDomainAppService _domainAppService;

        public DomainAppServiceTests()
        {
            _domainAppService = GetRequiredService<IDomainAppService>();
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
