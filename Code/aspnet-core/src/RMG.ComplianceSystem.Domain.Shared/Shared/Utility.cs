using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Security.Cryptography;
using System.Text;
using Volo.Abp.Timing;

namespace RMG.ComplianceSystem.Shared
{
    public static class Utility
    {
        public static Status RevisionDateStatus(this DateTime? date, IClock clock)
        {
            return GetStatusByDate(date, clock);
        }
        public static Status RevisionDateStatus(this DateTime date, IClock clock)
        {
            return GetStatusByDate(date, clock);
        }

        private static Status GetStatusByDate(DateTime? date, IClock clock)
        {
            if (date.Value.Date < clock.Now.Date) return Status.Delayed;
            if (date.Value.Date == clock.Now.Date) return Status.Due;
            if (date.Value.Date > clock.Now.Date &&
                date.Value.Date < clock.Now.Date.AddDays(15)) return Status.Soon;
            if (date.Value.Date == null) return Status.Closed;
            if (date.Value.Date > clock.Now.Date.AddDays(15)) return Status.Future;
            return Status.Future;
        }

        public static class KeyGenerator
        {
            public static string GetUniqueKey(int size)
            {
                char[] chars =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray();
                byte[] data = new byte[size];
                using (RNGCryptoServiceProvider crypto = new RNGCryptoServiceProvider())
                {
                    crypto.GetBytes(data);
                }
                StringBuilder result = new StringBuilder(size);
                foreach (byte b in data)
                {
                    result.Append(chars[b % (chars.Length)]);
                }
                return result.ToString();
            }
        }

        public static ExpandoObject ConvertTypeToExpandoObject<T>(T obj) where T : class
        {
            var expando = new ExpandoObject();

            var dictionary = (IDictionary<string, object>)expando;

            foreach (var property in obj.GetType().GetProperties())
                dictionary.Add(property.Name, property.GetValue(obj));

            return expando;
        }

        public static string GetURL(NotificationSource NotificationSource, Guid id, string status, string NonNotificationSource, Guid? subId = null)
        {
            switch (NotificationSource)
            {
               
                case NotificationSource.RiskTreatment:
                    return "https://iso.digitaltransformationinstitute.org:11001/risks-management/risk-treatment/"+id;
                case NotificationSource.Risk:
                    return "/risks-management/" + id +"/edit";
                default:
                    break;
            }
            return "";
        }


    }
}
