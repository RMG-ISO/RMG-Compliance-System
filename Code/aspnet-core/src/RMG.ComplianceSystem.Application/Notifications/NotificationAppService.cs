using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Permissions;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;
using RMG.ComplianceSystem.StaticData;

namespace RMG.ComplianceSystem.Notifications
{
    // [Authorize(ComplianceSystemPermissions.Notification.Default)]
    public class NotificationAppService :
        CrudAppService<
            Notification, //The Notification entity
            NotificationDto, //Used to show Notifications
            Guid, //Primary key of the Notification entity
            NotificationPagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdateNotificationDto>, //Used to create/update a Notification
        INotificationAppService //implement the INotificationAppService
    {
        //   Start Permissions
        #region Start Permissions
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.RiskAndOpportunity.Delete;
        #endregion
        // End Permissions
        //Start Properties and Constructor NotificationAppService
        #region Start Properties and Constructor NotificationAppService
        private readonly INotificationRepository NotificationRepository;
        private readonly IdentityUserManager User;

        public NotificationAppService(IdentityUserManager _User, INotificationRepository _NotificationRepository) : base(_NotificationRepository)
        {
            NotificationRepository = _NotificationRepository;
            User = _User;
        }
        #endregion
        //End Properties and Constructor NotificationAppService
        //Start Methods getbyId and GetListNotificationBy
        #region Start Methods getbyId and 
        public async Task<PagedResultDto<NotificationDto>> GetListRiskByFilterAsync(NotificationPagedAndSortedResultRequestDto input)
        {
            List<NotificationDto> Risks = new List<NotificationDto>();
            
                //get Risk By CategoryId and Filters and Pagination
                var ListRisks = NotificationRepository.Where(x => x.IsDeleted == false )
                    .Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
                // Mapping Notification to NotificationDto
                Risks = ObjectMapper.Map<List<Notification>, List<NotificationDto>>(ListRisks);
           
            var RisksData = new List<NotificationDto>();
            foreach (var item in Risks)
            {
                var Notification = new NotificationDto();
                Notification = item;
                if (Notification.CreatorId != null)
                {
                    var getuser = User.GetByIdAsync((Guid)Notification.CreatorId).Result;
                    Notification.Creator = ObjectMapper.Map<IdentityUser, IdentityUserDto>(getuser);
                }
               

                RisksData.Add(Notification);
            }
            //Get the total count with Risk
            var totalCount = RisksData.Count;
            // return RiskDtos and totalCount
            return new PagedResultDto<NotificationDto>(
                totalCount,
                RisksData
            );
        }
   
        #endregion


    }
}
