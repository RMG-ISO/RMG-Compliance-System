using RMG.ComplianceSystem.RiskTreatments;
using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.Notifications
{
    public interface INotificationRepository : IRepository<Notification, Guid>
    {
    }
}