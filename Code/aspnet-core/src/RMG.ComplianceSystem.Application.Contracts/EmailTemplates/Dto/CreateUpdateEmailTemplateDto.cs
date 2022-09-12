using System;
using System.ComponentModel;
namespace RMG.ComplianceSystem.EmailTemplates.Dtos
{
    [Serializable]
    public class CreateUpdateEmailTemplateDto
    {
        public string Key { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string NotificationBody { get; set; }

    }
}