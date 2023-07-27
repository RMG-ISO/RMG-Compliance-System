using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static RMG.ComplianceSystem.Subscription.SubscriptionDate;
namespace RMG.ComplianceSystem.Subscription
{
    public class SubscriptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _redirectUrl;

        public SubscriptionMiddleware(RequestDelegate next, string redirectUrl)
        {
            _next = next;
            _redirectUrl = redirectUrl;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            if (IsExpired())
            {
                httpContext.Response.Redirect(_redirectUrl, true);
                return;
            }

            await _next(httpContext);
        }
    }
}
