using Newtonsoft.Json.Serialization;
using RMG.ComplianceSystem.Departments.Dtos;
using RMG.ComplianceSystem.Risks.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.InternalAuditPreparation.Dto
{
    [Serializable]
    public class CreateUpdateInternalAuditPreparationDto
    {
        public string AuditCode { get; set; }
        public string AuditTitleEn { get; set; }
        public string AuditTitleAr { get; set; }
        public string AuditDescriptionEn { get; set; }
        public string AuditDescriptionAr { get; set; }
        public string AuditFieldEn { get; set; }
        public string AuditFieldAr { get; set; }
        public string AuditSetpsEn { get; set; }
        public string AuditSetpsAr { get; set; }
        public string AuditGoalsEn { get; set; }
        public string AuditGoalsAr { get; set; }
        public Guid DepartmentId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid RiskOpportunityId { get; set; }
        public Guid FrameworkId { get; set; }
        public List<InternalAuditorDto> Auditors { get; set; }


        public Boolean? IsApprove { get; set; }
        public DateTime? approveDate { get; set; }
        public Guid? ApproveBy { get; set; }
        public string CausesRefuse { get; set; }
    }
}
