using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Notifications.Dtos
{
    public class ProcedureAuditCreatedHandlerDto
    {
        public string DepartmentName { get; set; }
        public string ScheduledStartDate { get; set; }
        public string ScheduledEndDate { get; set; }
        public string URL { get; set; }
    }

    public class ProcedureAuditEndedHandlerDto
    {
        public string DepartmentName { get; set; }
        public string Date { get; set; }
        public string URL { get; set; }
    }

    public class ProcedureAuditStartHandlerDto
    {
        public string Name { get; set; }
        public string AuditNumber { get; set; }
        public string Date { get; set; }
        public string URL { get; set; }
    }
    

    public class NonConformityAddedDto
    {
        public string DepartmentName { get; set; }
        public string Number { get; set; }
        public string Date { get; set; }
        public string URL { get; set; }
    }

    public class CorrectiveActionCreatedDto
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string NonConformance { get; set; }
        public string Date { get; set; }
        public string URL { get; set; }
    }

    public class CorrectiveActionBeforeOneDayDto
    {
        public string Name { get; set; }
        public string CloseDate { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
        public string URL { get; set; }
    }

    public class NonConformityClosedDto
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string DepartmentName { get; set; }
        public string URL { get; set; }
    }

    public class ImprovementAddedDto
    {
        public string Name { get; set; }
        public string URL { get; set; }
    }

    public class ImprovmentAcceptedDto
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string AuditorName { get; set; }
        public string DepartmentName { get; set; }
        public string URL { get; set; }
    }

    public class TaskAddedDto
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
        public string URL { get; set; }
    }

    public class TaskBeforeOneDayDto
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string ImprovmenName { get; set; }
        public string Date { get; set; }
        public string URL { get; set; }
    }
}
