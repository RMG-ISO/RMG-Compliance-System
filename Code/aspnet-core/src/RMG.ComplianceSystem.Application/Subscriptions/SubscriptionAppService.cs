using RMG.ComplianceSystem.Subscription;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static RMG.ComplianceSystem.Subscription.SubscriptionDate;
namespace RMG.ComplianceSystem.Subscriptions
{
    public class SubscriptionAppService : ComplianceSystemAppService
    {
        public SubscriptionAppService()
        {
            
        }

        public SubscriptionDto GetSubscriptionDate()
        {
            return new SubscriptionDto() { StartDate = StartDate, EndDate = EndDate };
        }
    }
}
