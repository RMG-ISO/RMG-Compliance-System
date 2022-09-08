using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Notifications
{
    public interface INotificationAppService :
     ICrudAppService< //Defines CRUD methods
         NotificationDto, //Used to show books
         Guid, //Primary key of the book entity
         NotificationPagedAndSortedResultRequestDto, //Used for paging/sorting
         CreateUpdateNotificationDto> //Used to create/update a book
    {
        Task<PagedResultDto<NotificationDto>> GetListRiskByFilterAsync(NotificationPagedAndSortedResultRequestDto input);
    }
}
