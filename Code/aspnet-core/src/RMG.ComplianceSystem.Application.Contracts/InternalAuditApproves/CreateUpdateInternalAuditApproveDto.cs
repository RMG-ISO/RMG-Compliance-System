using Newtonsoft.Json.Serialization;
using RMG.ComplianceSystem.Departments.Dtos;
using RMG.ComplianceSystem.Risks.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.InternalAuditApproves
{
    [Serializable]
    public class CreateUpdateInternalAuditApproveDto
    {
        public Boolean IsApprove { get; set; }
        public DateTime approveDate { get; set; }
        public Guid ApproveBy { get; set; }
        public string CausesRefuse { get; set; }
    }
}
