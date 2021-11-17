using System;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Assessments;
using Volo.Abp.Domain.Repositories;
using Xunit;

namespace RMG.ComplianceSystem.EntityFrameworkCore.Assessments
{
    public class AssessmentRepositoryTests : ComplianceSystemEntityFrameworkCoreTestBase
    {
        private readonly IAssessmentRepository _assessmentRepository;

        public AssessmentRepositoryTests()
        {
            _assessmentRepository = GetRequiredService<IAssessmentRepository>();
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
