using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using RMG.ComplianceSystem.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Identity;
using Volo.Abp.Identity.Localization;
using Volo.Abp.Localization;
using static RMG.ComplianceSystem.Subscription.SubscriptionDate;

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

        public override async Task<IdentityUserDto> CreateAsync(IdentityUserCreateDto input)
        {
            var usersCount = await UserRepository.GetCountAsync();
            if (usersCount >= MaxUserCount)
                throw new UserFriendlyException(L["CreateUserError"]);
            return await base.CreateAsync(input);
        }

        public override async Task<IdentityUserDto> UpdateAsync(Guid id, IdentityUserUpdateDto input)
        {
            input.IsActive = true;
            if (!Regex.IsMatch(input.Email, @".+@.+\..+"))
                throw new BusinessException(ComplianceSystemDomainErrorCodes.InvalidEmail);

            var user = await UserRepository.GetAsync(id, false);
            if (user.NormalizedUserName == "ADMIN" && input.UserName != user.UserName)
            {
                throw new BusinessException(ComplianceSystemDomainErrorCodes.CannotChangeSuperAdminUsername);
            }

            if (user.NormalizedUserName == "ADMIN" && !input.Password.IsNullOrWhiteSpace())
            {
                throw new BusinessException(ComplianceSystemDomainErrorCodes.CannotChangeSuperAdminPassword);
            }
            return await base.UpdateAsync(id, input);
        }
    }
}
