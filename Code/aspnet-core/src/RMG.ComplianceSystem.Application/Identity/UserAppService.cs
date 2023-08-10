using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Identity
{
    [Dependency(ReplaceServices = true)]
    [ExposeServices(typeof(IIdentityUserAppService), typeof(IdentityUserAppService), typeof(UserAppService))]
    public class UserAppService : IdentityUserAppService
    {
        public UserAppService(
            IdentityUserManager userManager, 
            IIdentityUserRepository userRepository, 
            IIdentityRoleRepository roleRepository, 
            IOptions<IdentityOptions> identityOptions) : base(userManager, userRepository, roleRepository, identityOptions)
        {
        }

        public override async Task<IdentityUserDto> UpdateAsync(Guid id, IdentityUserUpdateDto input)
        {
            var user = await UserRepository.GetAsync(id, false);
            if (user.NormalizedUserName == "ADMIN" && input.UserName != user.UserName)
            {
                throw new BusinessException(ComplianceSystemDomainErrorCodes.CannotChangeSuperAdminUsername);
            }

            if (user.NormalizedUserName == "ADMIN" && !input.Password.IsNullOrWhiteSpace())
            {
                throw new BusinessException(ComplianceSystemDomainErrorCodes.CannotChangeSuperAdminPassword);
            }
            return base.UpdateAsync(id, input);
        }
    }
}
