using RMG.ComplianceSystem.Attachments.Dtos;
using RMG.ComplianceSystem.Departments.Dtos;
using RMG.ComplianceSystem.Frameworks.Dtos;
using RMG.ComplianceSystem.Risks.Dtos;
using RMG.ComplianceSystem.RiskTreatments;
using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.InternalAuditApproves
{
    [Serializable]
    public class InternalAuditApproveDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public Boolean IsApprove { get; set; }
        public DateTime approveDate { get; set; }
        public Guid ApproveBy { get; set; }
        public string CausesRefuse { get; set; }
        public IdentityUserDto UserApproveBy { get; set; }

    }



}
