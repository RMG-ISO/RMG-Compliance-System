using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Entities.Events;
using Volo.Abp.EventBus;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Employees
{
    public class CreateUserHandler : ILocalEventHandler<EntityChangedEventData<Volo.Abp.Identity.IdentityUser>>, ITransientDependency
    {
        private readonly IEmployeeAppService _employeeAppService;

        public CreateUserHandler(
            IEmployeeAppService employeeAppService
            )
        {
            _employeeAppService = employeeAppService;
        }

        /// <summary>
        /// this event to update department manger and qualityRepresentative
        /// </summary>
        /// <param name="eventData"></param>
        /// <returns></returns>
        public async Task HandleEventAsync(EntityChangedEventData<Volo.Abp.Identity.IdentityUser> eventData)
        {
            await _employeeAppService.CreateOrUpdateAsync(eventData.Entity.Id, eventData.Entity.Name + " " + eventData.Entity.Surname, eventData.Entity.Email,eventData.Entity.IsDeleted);
        }

    }
}
