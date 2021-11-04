using Volo.Abp;

namespace RMG.ComplianceSystem.Authors
{
    public class AuthorAlreadyExistsException : BusinessException
    {
        public AuthorAlreadyExistsException(string name)
            : base(ComplianceSystemDomainErrorCodes.AuthorAlreadyExists)
        {
            WithData("name", name);
        }
    }
}