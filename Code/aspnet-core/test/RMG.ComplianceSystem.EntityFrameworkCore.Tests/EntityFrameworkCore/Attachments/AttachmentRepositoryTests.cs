using System;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Attachments;
using Volo.Abp.Domain.Repositories;
using Xunit;

namespace RMG.ComplianceSystem.EntityFrameworkCore.Attachments
{
    public class AttachmentRepositoryTests : ComplianceSystemEntityFrameworkCoreTestBase
    {
        private readonly IAttachmentRepository _attachmentRepository;

        public AttachmentRepositoryTests()
        {
            _attachmentRepository = GetRequiredService<IAttachmentRepository>();
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
