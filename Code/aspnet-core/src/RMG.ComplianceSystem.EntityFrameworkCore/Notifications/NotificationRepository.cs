using System;
using System.Linq;
using System.Threading.Tasks;
using RMG.ComplianceSystem.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Notifications
{
    public class NotificationRepository : EfCoreRepository<ComplianceSystemDbContext, Notification, Guid>, INotificationRepository
    {
        public NotificationRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<Notification>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }

        [Obsolete]
        public override IQueryable<Notification> WithDetails()
        {
            return GetQueryable().IncludeDetails();
        }
    }
}
