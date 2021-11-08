using System;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Attachments;
using Volo.Abp.Domain.Repositories;
using Xunit;

namespace RMG.ComplianceSystem.EntityFrameworkCore.Attachments
{
    public class AttachmentFileRepositoryTests : ComplianceSystemEntityFrameworkCoreTestBase
    {
        private readonly IAttachmentFileRepository _attachmentFileRepository;

        public AttachmentFileRepositoryTests()
        {
            _attachmentFileRepository = GetRequiredService<IAttachmentFileRepository>();
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
