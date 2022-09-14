using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Services;
using Volo.Abp.Security.Encryption;

namespace RMG.ComplianceSystem.Helpers
{
    public class HelperAppService : ApplicationService
    {
        protected IStringEncryptionService _stringEncryptionService { get; }



        public HelperAppService(IStringEncryptionService stringEncryptionService)
        {
            _stringEncryptionService = stringEncryptionService;
        }



        public DataDecryptedReturnDto GetEncryptedData(string value)
        {
            // To enrcypt a value
            return new DataDecryptedReturnDto { Data = _stringEncryptionService.Encrypt(value) };
        }



        public DataDecryptedReturnDto GetDecryptedData(string value)
        {
            // To decrypt a value
            return new DataDecryptedReturnDto { Data = _stringEncryptionService.Decrypt(value) };
        }
    }
}
