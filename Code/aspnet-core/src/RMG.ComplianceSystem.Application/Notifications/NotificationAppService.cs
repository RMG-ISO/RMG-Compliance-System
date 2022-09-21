using System;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using RMG.ComplianceSystem.EmailTemplates;
using RMG.ComplianceSystem.Notifications.Dtos;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Emailing;
using Volo.Abp.SettingManagement;
using Volo.Abp.Users;

namespace RMG.ComplianceSystem.Notifications
{
    public class NotificationAppService : CrudAppService<Notification, NotificationDto, Guid, NotificationPagedAndSortedResultRequestDto, CreateUpdateNotificationDto, CreateUpdateNotificationDto>,
        INotificationAppService
    {
        //protected override string GetPolicyName { get; set; } = ISOPermissions.Notification.Default;
        //protected override string GetListPolicyName { get; set; } = ISOPermissions.Notification.Default;
        //protected override string CreatePolicyName { get; set; } = ISOPermissions.Notification.Create;
        //protected override string UpdatePolicyName { get; set; } = ISOPermissions.Notification.Update;
        //protected override string DeletePolicyName { get; set; } = ISOPermissions.Notification.Delete;

        private readonly INotificationRepository _repository;
        private readonly IEmailSender _emailSender;
        private readonly IHubContext<NotificationHub> _notificationHubContext;
        private readonly ICurrentUser _currentUser;
        private readonly IEmailTemplateRepository _emailTemplateRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly HttpContext _httpContext;
        public NotificationAppService(
                                        INotificationRepository repository
                                       , IEmailSender emailSender
                                       , ILogger<NotificationAppService> logger
                                       , IHubContext<NotificationHub> notificationHubContext
                                       , ICurrentUser currentUser, IHttpContextAccessor httpContextAccessor
                                       , IEmailTemplateRepository emailTemplateRepository) : base(repository)
        {
            _repository = repository;
            _emailSender = emailSender;
            _notificationHubContext = notificationHubContext;
            _currentUser = currentUser;
            _httpContextAccessor= httpContextAccessor;
            _emailTemplateRepository = emailTemplateRepository;
        }


        public void Test()
        {
            var fromAddress = new MailAddress("testnicauto@outlook.com", "From Name");
            var toAddress = new MailAddress("a.nabih@rmg-sa.com", "To Name");
            const string fromPassword = "Shakerm123";
            const string subject = "Subject";
            const string body = "Body";
            try
            {
                var smtp = new SmtpClient
                {
                    Host = "smtp-mail.outlook.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    // UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                };



                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body
                })
                {
                    smtp.Send(message);
                }
            }
            catch (Exception ex)
            {



                throw;
            }



        }


        /// <summary>
        /// Send Notifications by mail
        /// </summary>
        /// <returns></returns>
       // [RemoteService(false)]
        [AllowAnonymous]
        public async Task SendNotifications()
        {
            var notificationsTobeSent = _repository.Where(N => N.Status == Status.Created).ToList();

            foreach (var item in notificationsTobeSent)
            {
                if (item.Type == NotificationType.Email)
                {
                    try
                    {
                        var hearder = await _emailTemplateRepository.GetAsync(x => x.Key == "EmailHeader");
                        var footer = await _emailTemplateRepository.GetAsync(x => x.Key == "EmailFooter");
                        string _body = hearder.Body;
                        _body += "<p>"+GetURI() + item.Url+"</p>";
                        _body += item.Body;
                        _body += footer.Body.Replace("{{model.year}}", DateTime.Now.Year.ToString());

                        MailMessage mailMessage = new MailMessage
                        {
                            Subject = item.Subject,
                            Body = _body,
                            IsBodyHtml = item.IsHTML
                        };
                        mailMessage.To.Add(item.To);
                        if (!string.IsNullOrEmpty(item.CC))
                            mailMessage.CC.Add(item.CC);
                        await _emailSender.SendAsync(mailMessage);

                        item.Status = Status.Success;
                    }
                    catch (Exception ex)
                    {
                        item.Status = Status.Fail;

                        Logger.LogError(ex.ToString());
                    }

                    await _repository.UpdateAsync(item);
                }
                else if (item.Type == NotificationType.Push)
                {
                   
                }
                else if (item.Type == NotificationType.SMS)
                {

                }
            }

        }

        [RemoteService(false)]
        public async Task NotifyUser(Guid userToNotify)
        {
            string userId = userToNotify.ToString();
            var userNotifications = Repository.Where(t => t.To == userId);
            var Notifications = new NotifyUserDto
            {
                UnReadNotifications = userNotifications.LongCount(t => t.Type == NotificationType.Push && t.Status == Status.NotSeen),
                Notifications = userNotifications.Where(t => t.Type == NotificationType.Push && t.Status == Status.NotSeen).Take(6).Select(t => new NotifyUserNotificationDto
                {
                    Id = t.Id,
                    Title = t.Subject,
                    Status = t.Status,
                    Url = t.Url
                }).ToList()
            };

            await _notificationHubContext.Clients
                .User(userId)
                .SendAsync("ReceiveNotification", Notifications);
        }
        public async Task NotifictionUser(Guid userToNotify)
        {
            string userId = userToNotify.ToString();
            var userNotifications = Repository.Where(t => t.To == userId);
            var Notifications = new NotifyUserDto
            {
                UnReadNotifications = userNotifications.LongCount(t => t.Type == NotificationType.Push && t.Status == Status.NotSeen),
                Notifications = userNotifications.Where(t => t.Type == NotificationType.Push && t.Status == Status.NotSeen).Take(6).Select(t => new NotifyUserNotificationDto
                {
                    Id = t.Id,
                    Title = t.Subject,
                    Status = t.Status,
                    Url = t.Url
                }).ToList()
            };

            await _notificationHubContext.Clients
                .User(userId)
                .SendAsync("ReceiveNotification", Notifications);
        }
        public async Task MarkAsSeen(Guid id)
        {
            var notification = await Repository.GetAsync(id);
            notification.Status = Status.Seen;
            await Repository.UpdateAsync(notification);
            await CurrentUnitOfWork.SaveChangesAsync();
            if (_currentUser.IsAuthenticated)
                await NotifyUser(_currentUser.Id.Value);
        }
        public async Task<NotifyUserDto> GetCurrentUserNotificationAsync()
        {
            string userId = _currentUser.Id.ToString();
            var userNotifications = Repository.Where(t => t.To == userId);
            var Notifications = new NotifyUserDto
            {
                UnReadNotifications = userNotifications.LongCount(t => t.Type == NotificationType.Push && t.Status == Status.NotSeen),
                Notifications = userNotifications.Where(t => t.Type == NotificationType.Push && t.Status == Status.NotSeen).OrderByDescending(v => v.CreationTime).Take(6).Select(t => new NotifyUserNotificationDto
                {
                    Id = t.Id,
                    Title = t.Subject,
                    Status = t.Status,
                    Url = t.Url
                }).ToList()
            };
            return Notifications;

        }

        protected async override Task<IQueryable<Notification>> CreateFilteredQueryAsync(NotificationPagedAndSortedResultRequestDto input)
        {
            await CheckGetListPolicyAsync();
            return (await Repository.WithDetailsAsync())
               .WhereIf(!input.Body.IsNullOrEmpty(), t => t.Body.Contains(input.Body))
               .WhereIf(input.CreationTime.HasValue, t => t.CreationTime.Date == input.CreationTime.Value.Date);
        }

        public async Task<PagedResultDto<NotificationDto>> GetListCurrentUserNotificationsAsync(NotificationPagedAndSortedResultRequestDto input)
        {

            await CheckGetListPolicyAsync();

            var query = (await Repository.GetQueryableAsync())
               .WhereIf(!input.Body.IsNullOrEmpty(), t => t.Body.Contains(input.Body))
               .WhereIf(input.Source.HasValue, t => t.Source == input.Source)
               .WhereIf(input.CreationTime.HasValue, t => t.CreationTime.Date == input.CreationTime.Value.Date).Where(t => t.Type == NotificationType.Push && t.To == _currentUser.Id.ToString());

            var totalCount = await AsyncExecuter.CountAsync(query);

            query = ApplySorting(query, input);
            query = ApplyPaging(query, input);

            var entities = await AsyncExecuter.ToListAsync(query);

            var entityDtos = await MapToGetListOutputDtosAsync(entities);


            return new PagedResultDto<NotificationDto>(
                totalCount,
                entityDtos
            );

        }

        public Task<PagedResultDto<NotificationDto>> GetListRiskByFilterAsync(NotificationPagedAndSortedResultRequestDto input)
        {
            throw new NotImplementedException();
        }
        public string GetURI()
        {
            var httpContext = _httpContextAccessor.HttpContext ?? _httpContext;
            string url = httpContext?.Request?.Scheme + "://" + httpContext?.Request?.Host;//.Headers?["Referer"];
            //url.Substring(url.IndexOf("swagger"));
            return url;
        }
    }
}