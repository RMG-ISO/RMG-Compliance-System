using Shouldly;
using System.Threading.Tasks;
using Xunit;

namespace RMG.ComplianceSystem.Departments
{
    public class DepartmentAppServiceTests : ComplianceSystemApplicationTestBase
    {
        private readonly IDepartmentAppService _departmentAppService;

        public DepartmentAppServiceTests()
        {
            _departmentAppService = GetRequiredService<IDepartmentAppService>();
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
