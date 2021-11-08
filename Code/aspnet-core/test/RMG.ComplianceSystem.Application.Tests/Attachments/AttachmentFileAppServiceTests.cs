using Shouldly;
using System.Threading.Tasks;
using Xunit;

namespace RMG.ComplianceSystem.Attachments
{
    public class AttachmentFileAppServiceTests : ComplianceSystemApplicationTestBase
    {
        private readonly IAttachmentFileAppService _attachmentFileAppService;

        public AttachmentFileAppServiceTests()
        {
            _attachmentFileAppService = GetRequiredService<IAttachmentFileAppService>();
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
