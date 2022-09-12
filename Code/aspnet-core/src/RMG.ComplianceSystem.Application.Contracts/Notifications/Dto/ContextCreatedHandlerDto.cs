using System;

namespace RMG.ComplianceSystem.Notifications.Dtos
{
    [Serializable]
    public class ContextCreatedHandlerDto
    {
        //public string ContextName { get; set; }
        //public string Username { get; set; }
        //public string Subject { get; set; }
        //public string RevisionDate { get; set; }

        public string Creator { get; set; }
        public string Operation { get; set; }
        public string Title { get; set; }
        public string CotextType { get; set; }
        public string CotextKind { get; set; }
        public string Departments { get; set; }
        public string RevisionDate { get; set; }
    }

    public class ContextNotificationDto
    {
        public string Title { get; set; }
        public string Type { get; set; }
        public string Kind { get; set; }
    }
}