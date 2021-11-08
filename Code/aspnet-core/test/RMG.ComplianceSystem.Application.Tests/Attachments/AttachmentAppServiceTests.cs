using Shouldly;
using System.Threading.Tasks;
using Xunit;

namespace RMG.ComplianceSystem.Attachments
{
    public class AttachmentAppServiceTests : ComplianceSystemApplicationTestBase
    {
        private readonly IAttachmentAppService _attachmentAppService;

        public AttachmentAppServiceTests()
        {
            _attachmentAppService = GetRequiredService<IAttachmentAppService>();
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
