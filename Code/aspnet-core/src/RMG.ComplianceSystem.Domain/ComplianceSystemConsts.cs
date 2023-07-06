using System.Collections.Generic;

namespace RMG.ComplianceSystem
{
    public static class ComplianceSystemConsts
    {
        public const string DbTablePrefix = "App";

        public const string DbSchema = null;

        public static List<string> FrameworkExcelFileHeaders = new List<string>()
        {
            "رمزالبعد",
            "اسمالبعد",
            "رقمالضابط",
            "اسمالضابط",
            "رقمالمواصفة",
            "اسمالمخرج",
            "اسمالمواصفة/عربي"
        };
        public const string DomainReference = "رمزالبعد";
        public const string DomainName = "اسمالبعد";
        public const string ControllerNumber = "رقمالضابط";
        public const string ControllerName = "اسمالضابط";
        public const string SubControllerNum = "رقمالمواصفة";
        public const string SubControllerName = "اسمالمواصفة/عربي";

        public static List<string> ExcelFileHeaderColumnsName = new List<string>()
        {
            "رمزالبعد",
            "اسم البعد",
            "رقم الضابط",
            "اسم الضابط",
            "رقم المواصفة",
            "اسم المخرج",
            "اسم المواصفة / عربي"
        };
    }
}
