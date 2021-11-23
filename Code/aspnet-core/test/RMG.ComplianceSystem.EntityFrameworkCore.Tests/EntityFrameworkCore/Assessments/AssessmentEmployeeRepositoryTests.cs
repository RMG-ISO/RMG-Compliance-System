using System;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Assessments;
using Volo.Abp.Domain.Repositories;
using Xunit;

namespace RMG.ComplianceSystem.EntityFrameworkCore.Assessments
{
    public class AssessmentEmployeeRepositoryTests : ComplianceSystemEntityFrameworkCoreTestBase
    {
        private readonly IAssessmentEmployeeRepository _assessmentEmployeeRepository;

        public AssessmentEmployeeRepositoryTests()
        {
            _assessmentEmployeeRepository = GetRequiredService<IAssessmentEmployeeRepository>();
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
