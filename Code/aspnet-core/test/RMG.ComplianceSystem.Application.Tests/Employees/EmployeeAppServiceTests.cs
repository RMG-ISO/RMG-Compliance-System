using Shouldly;
using System.Threading.Tasks;
using Xunit;

namespace RMG.ComplianceSystem.Employees
{
    public class EmployeeAppServiceTests : ComplianceSystemApplicationTestBase
    {
        private readonly IEmployeeAppService _employeeAppService;

        public EmployeeAppServiceTests()
        {
            _employeeAppService = GetRequiredService<IEmployeeAppService>();
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
