using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.BackgroundWorkers.Quartz;

namespace RMG.ComplianceSystem.EmailTemplates
{
    [DisallowConcurrentExecution]
    public class EmailTemplateJob : QuartzBackgroundWorkerBase
    {
        private readonly IEmailTemplateManager _emailTemplateManager;

        /// <summary>
        /// this event to fire job in time
        /// </summary>
        /// <param name=""></param>
        public EmailTemplateJob(IEmailTemplateManager emailTemplateManager)
        {
            _emailTemplateManager = emailTemplateManager;

            JobDetail = JobBuilder.Create<EmailTemplateJob>().WithIdentity(nameof(EmailTemplateJob)).Build();

            Trigger = TriggerBuilder.Create().WithIdentity(nameof(EmailTemplateJob))
                .WithSchedule(CronScheduleBuilder.DailyAtHourAndMinute(00, 00))
                //.WithSimpleSchedule(s => s.WithIntervalInMinutes(1).RepeatForever().WithMisfireHandlingInstructionIgnoreMisfires())
                .Build();

            ScheduleJob = async scheduler =>
            {
                if (!await scheduler.CheckExists(JobDetail.Key))
                {
                    await scheduler.ScheduleJob(JobDetail, Trigger);
                }
            };
        }

        /// <summary>
        /// this event to send notifications based on Due Date
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async override Task Execute(IJobExecutionContext context)
        {
            //await _emailTemplateManager.OnAddRiskTreatmentSendToRiskTreatment();
        }
    }
}
