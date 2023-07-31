using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using static RMG.ComplianceSystem.Subscription.SubscriptionDate;
namespace RMG.ComplianceSystem.Subscription
{
    public class SubscriptionMiddleware : IMiddleware
    {
        private readonly IConfiguration _configuration;

        public SubscriptionMiddleware(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task InvokeAsync(HttpContext httpContext , RequestDelegate requestDelegate)
        { 
            if (IsExpired() && (httpContext.Request.Path.Value.Contains("api/app") || httpContext.Request.Path.Value.Contains("account")))
            {   
                httpContext.Response.StatusCode = 205;
                httpContext.Response.Body = Stream.Null;
            }

            await requestDelegate(httpContext);
        }
    }
}
