using RMG.ComplianceSystem.Attachments.Dtos;
using RMG.ComplianceSystem.Departments.Dtos;
using RMG.ComplianceSystem.Frameworks.Dtos;
using RMG.ComplianceSystem.Risks.Dtos;
using RMG.ComplianceSystem.RiskTreatments;
using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.InternalAuditPreparation.Dto
{
    [Serializable]
    public class InternalAuditPreparationDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
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
        public virtual DepartmentDto Department { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid? RiskOpportunityId { get; set; }
        public virtual RiskAndOpportunityDto RiskOpportunity { get; set; }
        public Guid FrameworkId { get; set; }
        public virtual FrameworkDto Framework { get; set; }
        public List<AuditorDto> AuditorDto { get; set; }
        public List<InternalAuditorDto> AuditorDeptDto { get; set; }

        public Boolean? IsApprove { get; set; }
        public DateTime? approveDate { get; set; }
        public Guid? ApproveBy { get; set; }
        public string CausesRefuse { get; set; }

    }



}
