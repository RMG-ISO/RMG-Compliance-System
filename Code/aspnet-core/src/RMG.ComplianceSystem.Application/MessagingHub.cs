using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.AspNetCore.SignalR;
using Volo.Abp.Users;

namespace RMG.ComplianceSystem
{
    [HubRoute("/my-messaging-hub")]
    public class MessagingHub:Hub
    {
        public async Task SendMessage(string targetUserName, dynamic message)
        {
            var currentUserName = targetUserName; 
            var txt = "text";
            await Clients.All.SendAsync("SendData", txt);
        }
    }
}
