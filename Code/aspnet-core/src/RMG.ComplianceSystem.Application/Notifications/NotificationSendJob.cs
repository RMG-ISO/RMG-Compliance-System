using Quartz;
using RMG.ComplianceSystem.Notifications;
using System.Threading.Tasks;
using Volo.Abp.BackgroundWorkers.Quartz;

namespace RMG.ComplianceSystem.Contexts
{
    [DisallowConcurrentExecution]
    public class NotificationSendJob : QuartzBackgroundWorkerBase
    {
        private readonly INotificationAppService _notificationAppService;

        /// <summary>
        /// this event to fire send email in time
        /// </summary>
        /// <param name="notificationAppService"></param>
        public NotificationSendJob(INotificationAppService notificationAppService)
        {
            _notificationAppService = notificationAppService;

            JobDetail = JobBuilder.Create<NotificationSendJob>().WithIdentity(nameof(NotificationSendJob)).Build();

            Trigger = TriggerBuilder.Create().WithIdentity(nameof(NotificationSendJob))
                .WithSimpleSchedule(s => s.WithIntervalInMinutes(5).RepeatForever().WithMisfireHandlingInstructionIgnoreMisfires())
                .Build();

            ScheduleJob = async scheduler =>
            {
                if (!await scheduler.CheckExists(JobDetail.Key))
                    await scheduler.ScheduleJob(JobDetail, Trigger);
            };
        }

        /// <summary>
        /// this event to send notification by mail
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public override async Task Execute(IJobExecutionContext context)
        {
         //   await _notificationAppService.SendNotifications();
        }
    }
}
