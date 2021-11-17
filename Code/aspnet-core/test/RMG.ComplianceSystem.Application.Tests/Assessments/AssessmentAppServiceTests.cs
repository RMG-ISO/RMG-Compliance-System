using Shouldly;
using System.Threading.Tasks;
using Xunit;

namespace RMG.ComplianceSystem.Assessments
{
    public class AssessmentAppServiceTests : ComplianceSystemApplicationTestBase
    {
        private readonly IAssessmentAppService _assessmentAppService;

        public AssessmentAppServiceTests()
        {
            _assessmentAppService = GetRequiredService<IAssessmentAppService>();
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
