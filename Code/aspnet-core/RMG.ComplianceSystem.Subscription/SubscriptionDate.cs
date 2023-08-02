namespace RMG.ComplianceSystem.Subscription
{
    public class SubscriptionDate
    {
        public static DateTime StartDate = new DateTime(2023, 7, 1);
        public static DateTime EndDate = new DateTime(2023, 7, 20);
        public static bool IsExpired()
        {
            return ((DateTime.Now <= StartDate) || (DateTime.Now > EndDate));
        }


        public static int MaxUserCount = 20;
    }
}