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
using static RMG.ComplianceSystem.Subscription.SubscriptionDate;

namespace RMG.ComplianceSystem.IdentityUser
{
    [Dependency(ReplaceServices = true)]
    [ExposeServices(typeof(IIdentityUserAppService), typeof(IdentityUserAppService), typeof(ComplianceSystemIdentityUserAppService))]
    public class ComplianceSystemIdentityUserAppService : IdentityUserAppService
    {
        public ComplianceSystemIdentityUserAppService(IdentityUserManager userManager, IIdentityUserRepository userRepository, IIdentityRoleRepository roleRepository, IOptions<IdentityOptions> identityOptions) : base(userManager, userRepository, roleRepository, identityOptions)
        {
        }


        public override async Task<IdentityUserDto> CreateAsync(IdentityUserCreateDto input)
        {
            var usersCount = await UserRepository.GetCountAsync();
            if (usersCount >= MaxUserCount)
                throw new UserFriendlyException(L["CreateUserError"]);
            return await base.CreateAsync(input);
        }
    }
}
