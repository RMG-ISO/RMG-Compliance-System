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
    public class InternalAuditorDto 
    {
        public Guid InternalAuditPreparationId { get; set; }
        public Guid UserId { get; set; }
        public Guid? DepartmentId { get; set; }
        public Boolean IsAuditor { get; set; } = false;


    }
    public class AuditorDto
    {
        public Guid InternalAuditPreparationId { get; set; }
        public Guid UserId { get; set; }
        public Boolean IsAuditor { get; set; } 

    }
  


}
